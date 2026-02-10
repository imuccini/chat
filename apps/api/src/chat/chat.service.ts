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
        this.logger.debug(`[saveMessage] Attempting to save message ${message.id} to room ${message.roomId} for tenant ${tenantId}`);
        try {
            const saved = await this.prisma.message.create({
                data: {
                    id: message.id,
                    text: message.text,
                    senderId: message.senderId,
                    senderAlias: message.senderAlias,
                    senderGender: message.senderGender,
                    imageUrl: (message as any).imageUrl || null,
                    recipientId: message.recipientId || null,
                    roomId: message.roomId || null,
                    tenant: { connect: { id: tenantId } },
                    user: { connect: { id: message.senderId } },
                },
            });
            this.logger.debug(`[saveMessage] Success: saved message ${saved.id}`);
            return saved;
        } catch (error: any) {
            this.logger.error(`[saveMessage] Failed: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get messages for a room with 3-hour retention
     */
    /**
     * Get messages for a tenant, optionally filtered by room, with 48-hour retention
     */
    async getMessagesForRoom(tenantId: string, roomId?: string, limit = 100): Promise<any[]> {
        // Increased retention to 48h for better UX
        const retentionTime = new Date(Date.now() - 48 * 60 * 60 * 1000);
        this.logger.debug(`Fetching messages for tenant ${tenantId} ${roomId ? `room ${roomId}` : '(global/all)'}`);

        try {
            const where: any = {
                tenantId,
                createdAt: { gte: retentionTime },
            };

            if (roomId) {
                where.roomId = roomId;
            } else {
                // If no room specified, maybe fetch messages with NO room (global)?
                // Or fetch ALL messages? 
                // Usually for "Main" chat we use a specific room ID. 
                // If roomId is undefined, let's assume we want messages that have roomID = null (Global Tenant Chat if exists)
                // OR we just return empty if strict.
                // Let's assume strict filtering: if roomId provided, filter by it. If not, only get global messages (roomId: null)
                where.roomId = null;
            }

            const messages = await this.prisma.message.findMany({
                where,
                orderBy: { createdAt: 'asc' },
                take: limit,
            });
            this.logger.debug(`Found ${messages.length} messages`);
            return messages;
        } catch (error) {
            this.logger.error(`Failed to fetch messages: ${error.message}`, error.stack);
            throw error;
        }
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
