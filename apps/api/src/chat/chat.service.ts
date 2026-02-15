import { Injectable, Logger, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '@local/database/generated/client/index.js';
import type { Message } from '@local/types';

@Injectable()
export class ChatService {
  private readonly logger = new Logger('ChatService');

  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  /**
   * Save a message to the database
   */
  async saveMessage(message: Message, tenantId: string): Promise<any> {
    this.logger.debug(
      `[saveMessage] Attempting to save message ${message.id} to room ${message.roomId} for tenant ${tenantId}`,
    );
    try {
      const saved = await this.prisma.message.create({
        data: {
          id: message.id,
          text: message.text,
          senderId: message.senderId,
          senderAlias: message.senderAlias,
          senderGender: message.senderGender || 'other',
          imageUrl: (message as any).imageUrl || null,
          recipientId: message.recipientId || null,
          room: message.roomId
            ? { connect: { id: message.roomId } }
            : undefined,
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
  async getMessagesForRoom(
    tenantId: string,
    roomId?: string,
    limit = 100,
    since?: string,
  ): Promise<any[]> {
    this.logger.debug(
      `Fetching messages for tenant ${tenantId} ${roomId ? `room ${roomId}` : '(global/all)'}${since ? ` since ${since}` : ''}`,
    );

    try {
      // If `since` is provided, fetch only messages newer than that timestamp (exclusive).
      // Otherwise fall back to the default 48h retention window.
      const createdAtFilter = since
        ? { gt: new Date(since) }
        : { gte: new Date(Date.now() - 48 * 60 * 60 * 1000) };

      const where: any = {
        tenantId,
        createdAt: createdAtFilter,
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
      this.logger.error(
        `Failed to fetch messages: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Get private messages for a user within a tenant
   */
  async getPrivateMessages(
    userId: string,
    tenantId: string,
    since?: string,
    limit = 200,
  ): Promise<any[]> {
    this.logger.debug(
      `Fetching private messages for user ${userId} in tenant ${tenantId}${since ? ` since ${since}` : ''}`,
    );

    try {
      const createdAtFilter = since
        ? { gt: new Date(since) }
        : { gte: new Date(Date.now() - 48 * 60 * 60 * 1000) };

      const messages = await this.prisma.message.findMany({
        where: {
          tenantId,
          recipientId: { not: null },
          createdAt: createdAtFilter,
          OR: [{ senderId: userId }, { recipientId: userId }],
        },
        orderBy: { createdAt: 'asc' },
        take: limit,
      });
      this.logger.debug(`Found ${messages.length} private messages`);
      return messages;
    } catch (error) {
      this.logger.error(
        `Failed to fetch private messages: ${error.message}`,
        error.stack,
      );
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
    return (
      membership?.role === 'ADMIN' ||
      membership?.role === 'MODERATOR' ||
      membership?.canModerate
    );
  }

  /**
   * Get tenant by slug with rooms
   */
  async getTenantBySlug(
    slug: string,
  ): Promise<Prisma.TenantGetPayload<{ include: { rooms: true } }> | null> {
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

  /**
   * Hide a private conversation for a user
   */
  async hideConversation(
    userId: string,
    peerId: string,
    tenantId: string,
  ): Promise<boolean> {
    try {
      await this.prisma.hiddenConversation.upsert({
        where: {
          userId_peerId_tenantId: {
            userId,
            peerId,
            tenantId,
          },
        },
        update: {
          hiddenAt: new Date(),
        },
        create: {
          userId,
          peerId,
          tenantId,
        },
      });
      return true;
    } catch (error) {
      this.logger.error(
        `Failed to hide conversation for user ${userId} and peer ${peerId}: ${error.message}`,
      );
      return false;
    }
  }

  /**
   * Block a user
   */
  async blockUser(userId: string, blockedId: string): Promise<boolean> {
    try {
      await this.prisma.blockedUser.upsert({
        where: {
          userId_blockedId: { userId, blockedId },
        },
        update: {},
        create: { userId, blockedId },
      });
      return true;
    } catch (error) {
      this.logger.error(
        `Failed to block user ${blockedId} for user ${userId}: ${error.message}`,
      );
      return false;
    }
  }

  /**
   * Unblock a user
   */
  async unblockUser(userId: string, blockedId: string): Promise<boolean> {
    try {
      await this.prisma.blockedUser.deleteMany({
        where: { userId, blockedId },
      });
      return true;
    } catch (error) {
      this.logger.error(
        `Failed to unblock user ${blockedId} for user ${userId}: ${error.message}`,
      );
      return false;
    }
  }

  /**
   * Get IDs of all users blocked by this user
   */
  async getBlockedUserIds(userId: string): Promise<string[]> {
    const records = await this.prisma.blockedUser.findMany({
      where: { userId },
      select: { blockedId: true },
    });
    return records.map((r: { blockedId: string }) => r.blockedId);
  }

  /**
   * Check if either user has blocked the other (bidirectional)
   */
  async isBlocked(userA: string, userB: string): Promise<boolean> {
    const count = await this.prisma.blockedUser.count({
      where: {
        OR: [
          { userId: userA, blockedId: userB },
          { userId: userB, blockedId: userA },
        ],
      },
    });
    return count > 0;
  }

  /**
   * Create a report
   */
  async createReport(
    reporterId: string,
    accusedId: string,
    reason: string,
    details: string | undefined,
    context: any,
    tenantId: string,
  ): Promise<boolean> {
    try {
      await this.prisma.report.create({
        data: {
          reporterId,
          accusedId,
          reason,
          details: details || null,
          context: context || null,
          tenantId,
        },
      });
      return true;
    } catch (error) {
      this.logger.error(
        `Failed to create report from ${reporterId} against ${accusedId}: ${error.message}`,
      );
      return false;
    }
  }

  /**
   * Unhide a private conversation for a user
   */
  async unhideConversation(
    userId: string,
    peerId: string,
    tenantId: string,
  ): Promise<boolean> {
    try {
      await this.prisma.hiddenConversation.deleteMany({
        where: {
          userId,
          peerId,
          tenantId,
        },
      });
      return true;
    } catch (error) {
      this.logger.error(
        `Failed to unhide conversation for user ${userId} and peer ${peerId}: ${error.message}`,
      );
      return false;
    }
  }
}
