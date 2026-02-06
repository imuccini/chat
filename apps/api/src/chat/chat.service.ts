import { Injectable, Logger, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '@local/database/generated/client/index.js';
import type { Message } from '@local/types';
import fs from 'fs';

console.error('[ChatService] FILE EVALUATED - TIMESTAMP: ' + Date.now());

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
                    recipientId: message.recipientId || null,
                    roomId: message.roomId || null,
                    tenantId: tenantId,
                    userId: message.senderId,
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
    async getMessagesForRoom(roomId: string, tenantId: string, limit = 100): Promise<any[]> {
        const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
        this.logger.debug(`Fetching messages for room ${roomId} in tenant ${tenantId}`);

        try {
            const messages = await this.prisma.message.findMany({
                where: {
                    tenantId,
                    roomId,
                    createdAt: { gte: threeHoursAgo },
                },
                orderBy: { createdAt: 'asc' },
                take: limit,
            });
            this.logger.debug(`Found ${messages.length} messages`);
            return messages;
        } catch (error) {
            this.logger.error(`Failed to fetch messages: ${error.message}`, error.stack);
            fs.appendFileSync('trace.log', `[ChatService ERROR] ${error.message}\n${error.stack}\n`);
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
