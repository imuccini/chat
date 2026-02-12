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

    /**
     * Get all staff members for a tenant (Admins/Owners)
     * Prioritizes OWNER, then ADMIN, then STAFF/MODERATOR
     */
    async findStaff(slug: string): Promise<any[]> {
        const tenant = await this.prisma.tenant.findUnique({
            where: { slug },
            include: {
                members: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        role: 'asc' // Not reliable for enum sorting, better to sort in JS
                    }
                }
            }
        });

        if (!tenant) {
            console.warn(`[TenantService.findStaff] Tenant not found for slug: ${slug}`);
            return [];
        }

        // Sort members by importance: OWNER > ADMIN > MODERATOR > STAFF
        const priorityOrder: Record<string, number> = { 'OWNER': 0, 'ADMIN': 1, 'MODERATOR': 2, 'STAFF': 3 };
        const sortedMembers = tenant.members.sort((a: any, b: any) => {
            const pA = priorityOrder[a.role] ?? 99;
            const pB = priorityOrder[b.role] ?? 99;
            return pA - pB;
        });

        let staff = sortedMembers.map((m: any) => m.user);

        // Fallback for DEV/PRE-CONFIGURED tenants:
        // If no members are found, return the first user in the DB as a 'System Admin' fallback
        // so the 'Contact Staff' feature doesn't break during testing.
        if (staff.length === 0) {
            this.logger.warn(`[TenantService.findStaff] No members found for tenant "${slug}". Falling back to first user for dev/demo purposes.`);
            const firstUser = await this.prisma.user.findFirst({
                where: { isAnonymous: false },
                orderBy: { createdAt: 'asc' }
            });
            if (firstUser) staff = [firstUser];
        }

        console.log(`[TenantService.findStaff] Found ${staff.length} staff members for tenant "${slug}". Primary:`, staff[0] ? { id: staff[0].id, name: staff[0].name } : 'None');
        return staff;
    }

    /**
     * Create feedback for a tenant
     */
    async createFeedback(userId: string, tenantId: string, score: number, comment?: string): Promise<any> {
        // Ensure user exists (for anonymous feedback where userId might be generated client-side but not in DB)
        const userExists = await this.prisma.user.findUnique({ where: { id: userId } });

        let finalUserId = userId;

        if (!userExists) {
            this.logger.log(`[createFeedback] User ${userId} not found, creating anonymous user`);
            try {
                const newUser = await this.prisma.user.create({
                    data: {
                        id: userId, // Try to use the ID provided by client if possible
                        name: 'Anonymous Feedback',
                        isAnonymous: true,
                    },
                });
                finalUserId = newUser.id;
            } catch (e) {
                // Determine if we should fallback or re-throw
                this.logger.error(`Failed to create anonymous user for feedback: ${e.message}`);
                // If ID conflict or other issue, create a fresh user
                const fallbackUser = await this.prisma.user.create({
                    data: {
                        name: 'Anonymous Feedback',
                        isAnonymous: true
                    }
                });
                finalUserId = fallbackUser.id;
            }
        }

        return this.prisma.feedback.create({
            data: {
                userId: finalUserId,
                tenantId,
                score,
                comment,
            },
            include: { user: true }
        });
    }

    /**
     * Get all feedback for a tenant
     */
    async getFeedback(tenantId: string): Promise<any[]> {
        return (this.prisma as any).feedback.findMany({
            where: { tenantId },
            include: { user: true },
            orderBy: { createdAt: 'desc' },
        });
    }
}
