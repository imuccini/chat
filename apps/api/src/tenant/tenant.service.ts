import { Injectable, Logger, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '@local/database/generated/client/index.js';

@Injectable()
export class TenantService {
    private readonly logger = new Logger('TenantService');

    constructor(@Inject(PrismaService) private readonly prisma: PrismaService) { }

    /**
     * Get tenant by slug with rooms
     */
    async findBySlug(slug: string): Promise<Prisma.TenantGetPayload<{ include: { rooms: true } }> | null> {
        return this.prisma.tenant.findUnique({
            where: { slug },
            include: { rooms: true },
        });
    }

    /**
     * Get user's room memberships across all tenants for auto-rejoin
     */
    async getUserRooms(userId: string): Promise<Prisma.RoomGetPayload<{}>[]> {
        const memberships = await this.prisma.tenantMember.findMany({
            where: { userId },
            include: {
                tenant: {
                    include: { rooms: true },
                },
            },
        });

        // Flatten all rooms from all tenants the user is a member of
        return memberships.flatMap((m: any) => m.tenant.rooms);
    }

    /**
     * Check if user has moderation permissions in a specific tenant
     */
    async canModerate(userId: string, tenantSlug: string): Promise<boolean> {
        const tenant = await this.prisma.tenant.findUnique({
            where: { slug: tenantSlug },
            include: {
                members: {
                    where: { userId },
                },
            },
        });

        if (!tenant || tenant.members.length === 0) return false;

        const membership = tenant.members[0];
        return (
            membership.role === 'ADMIN' ||
            membership.role === 'MODERATOR' ||
            membership.canModerate
        );
    }

    /**
     * Validate NAS device connection for a tenant
     * Matches by any of the provided identifiers: nasId, bssid, or publicIp
     */
    async validateNas(nasId?: string, bssid?: string, publicIp?: string): Promise<any> {
        this.logger.log(`Validating NAS: nasId=${nasId}, bssid=${bssid}, publicIp=${publicIp}`);

        const criteria: Prisma.NasDeviceWhereInput[] = [];
        if (nasId) criteria.push({ nasId });
        if (bssid) criteria.push({ bssid });
        if (publicIp) criteria.push({ publicIp });

        if (criteria.length === 0) {
            return null;
        }

        return this.prisma.nasDevice.findFirst({
            where: {
                OR: criteria
            },
            include: { tenant: true },
        });
    }

    /**
     * Update tenant details
     */
    async update(id: string, data: { name?: string; logoUrl?: string }): Promise<Prisma.TenantGetPayload<{}>> {
        return this.prisma.tenant.update({
            where: { id },
            data,
        });
    }

    async isTenantAdmin(userId: string, tenantId: string): Promise<boolean> {
        const member = await this.prisma.tenantMember.findUnique({
            where: {
                userId_tenantId: {
                    userId,
                    tenantId,
                },
            },
        });
        return member?.role === 'ADMIN' || member?.role === 'OWNER';
    }

    /**
     * Resolve a user ID from a session token (for auth without JWT)
     */
    async resolveUserFromToken(token: string): Promise<string | null> {
        const session = await this.prisma.session.findFirst({
            where: { token, expiresAt: { gt: new Date() } },
        });
        return session?.userId || null;
    }

    /**
     * Get all tenants with public info for discovery map
     */
    async findAllPublic(): Promise<any[]> {
        return this.prisma.tenant.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
                logoUrl: true,
                latitude: true,
                longitude: true,
            },
        });
    }
}
