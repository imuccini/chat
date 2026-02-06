import { Injectable, Logger, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '@local/database/generated/client/index.js';
import type { Message } from '@local/types';

@Injectable()
export class ChatService {
    private readonly logger = new Logger('ChatService');

    constructor(@Inject(PrismaService) private readonly prisma: PrismaService) { }

    /**
     * Save a message to the database
     */
    async saveMessage(message: Message, tenantId: string): Promise<any> {
        return this.prisma.message.create({
            data: {
                id: message.id,
                text: message.text,
                senderId: message.senderId,
                senderAlias: message.senderAlias,
                senderGender: message.senderGender,
                recipientId: message.recipientId || null,
                roomId: message.roomId || null,
                tenantId: tenantId,
                userId: message.senderId,
            },
        });
    }

    /**
     * Get messages for a room with 3-hour retention
     */
    async getMessagesForRoom(roomId: string | undefined, tenantId: string, limit = 100): Promise<any[]> {
        const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);

        return this.prisma.message.findMany({
            where: {
                tenantId,
                ...(roomId ? { roomId } : { roomId: null }),
                createdAt: { gte: threeHoursAgo },
            },
            orderBy: { createdAt: 'asc' },
            take: limit,
        });
    }

    /**
     * Delete a message (for moderators/admins)
     */
    async deleteMessage(messageId: string, tenantId: string): Promise<boolean> {
        try {
            await this.prisma.message.delete({
                where: { id: messageId, tenantId },
            });
            return true;
        } catch (error) {
            this.logger.warn(`Failed to delete message ${messageId}: ${error}`);
            return false;
        }
    }

    /**
     * Check if user can moderate in a tenant
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

        if (!tenant) return false;

        const membership = tenant.members[0];
        return membership?.role === 'ADMIN' || membership?.role === 'MODERATOR' || membership?.canModerate;
    }

    /**
     * Get tenant by slug with rooms
     */
    async getTenantBySlug(slug: string): Promise<Prisma.TenantGetPayload<{ include: { rooms: true } }> | null> {
        return this.prisma.tenant.findUnique({
            where: { slug },
            include: { rooms: true },
        });
    }

    /**
     * Get user's room memberships for auto-rejoin
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

        // Flatten rooms from all tenants
        return memberships.flatMap((m: any) => m.tenant.rooms);
    }
}
