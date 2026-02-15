import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ConnectedSocket,
    MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { Logger, Inject } from '@nestjs/common';
import type {
    CustomSocket,
    User,
    Message,
    ServerToClientEvents,
    ClientToServerEvents,
} from '@local/types';
import { ChatService } from './chat.service.js';
import { TenantService } from '../tenant/tenant.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

@WebSocketGateway({
    cors: {
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
            'https://app.meetlocal.app',
            'capacitor://localhost',
        ],
        credentials: true,
    },
    transports: ['websocket', 'polling'],
    pingTimeout: 10000, // 10 seconds - detect dead connections faster
    pingInterval: 5000, // 5 seconds - more frequent heartbeats for mobile
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server<ClientToServerEvents, ServerToClientEvents>;

    private logger = new Logger('ChatGateway');
    private onlineUsers = new Map<
        string,
        { user: User; tenantId: string; tenantSlug: string; rooms: string[] }
    >();
    private userSocketMap = new Map<string, string>(); // userId → current socket.id for deduplication
    private lastMessageTime = new Map<string, number>();
    private readonly RATE_LIMIT_MS = 500;

    constructor(
        @Inject(JwtService) private readonly jwtService: JwtService,
        @Inject(ChatService) private readonly chatService: ChatService,
        @Inject(TenantService) private readonly tenantService: TenantService,
        @Inject(PrismaService) private readonly prisma: PrismaService,
    ) { }

    async handleConnection(socket: CustomSocket) {
        this.logger.log(`NEW CONNECTION: ${socket.id}`);

        // BetterAuth sessions are often passed as the token
        const token = socket.handshake.auth?.token || socket.handshake.query?.token;
        const tenantSlug = socket.handshake.query?.tenantSlug as string;
        const existingUserId = socket.handshake.query?.userId as string;
        const existingUserAlias = socket.handshake.query?.userAlias as string;

        // Allow anonymous connections (for users who haven't logged in with Better Auth)
        if (!token) {
            this.logger.log(
                `Anonymous connection from ${socket.id}${existingUserId ? ` (existing: ${existingUserId})` : ''} alias: ${existingUserAlias || 'none'}`,
            );

            // Get tenant to assign to anonymous user
            let tenantId: string | null = null;
            if (tenantSlug) {
                const tenant = await this.tenantService.findBySlug(tenantSlug);
                tenantId = tenant?.id || null;
            }

            try {
                let userId = existingUserId;
                const guestFallback = `Guest-${socket.id.substring(0, 6)}`;
                let userAlias = this.sanitizeAlias(existingUserAlias, guestFallback);
                let isNewUser = false;

                // Check if user already exists in DB (for reconnection)
                if (existingUserId) {
                    const existingUser = await this.prisma.user.findUnique({
                        where: { id: existingUserId },
                    });

                    if (existingUser) {
                        // User exists, use their data
                        userId = existingUser.id;
                        userAlias = existingUser.name || userAlias;
                        this.logger.log(
                            `Reconnected existing anonymous user: ${userAlias} (${userId})`,
                        );
                    } else {
                        // User ID provided but doesn't exist in DB - create new
                        isNewUser = true;
                    }
                } else {
                    // No existing ID - create new user
                    isNewUser = true;
                }

                // Create new user in database if needed
                if (isNewUser) {
                    const anonymousUser = await this.prisma.user.create({
                        data: {
                            name: this.sanitizeAlias(userAlias, guestFallback),
                            isAnonymous: true,
                        },
                    });
                    userId = anonymousUser.id;
                    userAlias = anonymousUser.name || userAlias;
                    this.logger.log(
                        `Created new anonymous user: ${userAlias} (${userId})`,
                    );
                }

                socket.data.user = {
                    id: userId,
                    alias: userAlias,
                    tenantId: tenantId,
                };
                socket.data.isAnonymous = true;

                // Only emit userCreated if we created a new user to prevent unnecessary updates
                if (isNewUser) {
                    socket.emit('userCreated', {
                        id: userId,
                        alias: userAlias,
                        tenantId: tenantId,
                    });
                } else {
                    // For existing users, emit userConfirmed so client knows connection is ready
                    socket.emit('userConfirmed', {
                        id: userId,
                        alias: userAlias,
                        tenantId: tenantId,
                    });
                }
            } catch (error: any) {
                this.logger.error(`Failed to handle anonymous user: ${error.message}`);
                socket.disconnect();
            }
            return;
        }

        try {
            // Validate session against DB — look up by token field for consistency
            // with resolveSession() which also uses the token column
            const session = await this.prisma.session.findFirst({
                where: { token: token as string },
                include: { user: true },
            });

            if (!session || new Date(session.expiresAt) < new Date()) {
                this.logger.warn(`Connection rejected: Invalid or expired session`);
                socket.disconnect();
                return;
            }

            const userId = session.userId;

            // Store user data in socket
            socket.data.user = {
                id: userId,
                alias: session.user.name || 'User',
                tenantId: session.user.tenantId,
            };
            socket.data.isAnonymous = false;

            this.logger.log(
                `User connected: ${socket.data.user.alias} (${socket.data.user.id})`,
            );

            // Auto-rejoin rooms from DB (for Capacitor reconnects)
            const roomMemberships = await this.tenantService.getUserRooms(userId);
            roomMemberships.forEach((room: any) => {
                socket.join(room.id);
                this.logger.debug(`User ${userId} auto-joined room ${room.id}`);
            });
            socket.data.rooms = roomMemberships.map((r: any) => r.id);
        } catch (error: any) {
            this.logger.error(`Connection error: ${error.message}`);
            socket.disconnect();
        }
    }

    handleDisconnect(socket: CustomSocket) {
        this.logger.log(`[handleDisconnect] Socket ${socket.id} disconnected`);

        const userData = this.onlineUsers.get(socket.id);
        if (userData) {
            // Remove from online users
            this.onlineUsers.delete(socket.id);

            // Remove from user-socket tracking ONLY if this is the current socket
            const currentSocketId = this.userSocketMap.get(userData.user.id);
            if (currentSocketId === socket.id) {
                this.userSocketMap.delete(userData.user.id);
                this.logger.log(
                    `[handleDisconnect] Removed user ${userData.user.id} from tracking`,
                );
            } else {
                this.logger.warn(
                    `[handleDisconnect] User ${userData.user.id} has different active socket (${currentSocketId}), not removing from tracking`,
                );
            }

            // Broadcast presence update
            this.broadcastPresence(userData.tenantSlug);
        }
    }

    @SubscribeMessage('join')
    async handleJoin(
        @ConnectedSocket() socket: CustomSocket,
        @MessageBody() data: { user: User; tenantSlug: string },
    ) {
        const { user, tenantSlug } = data;
        if (!user || !tenantSlug) return;

        this.logger.log(
            `[handleJoin] User ${user.id} (${user.alias}) joining tenant ${tenantSlug} with socket ${socket.id}`,
        );

        // Fetch tenant to get ID and rooms
        const tenant = await this.tenantService.findBySlug(tenantSlug);
        if (!tenant) {
            this.logger.warn(`[handleJoin] Tenant ${tenantSlug} not found`);
            return;
        }

        // CRITICAL: Check if this user is already online with a DIFFERENT socket (ghost cleanup)
        const existingSocketId = this.userSocketMap.get(user.id);
        if (existingSocketId && existingSocketId !== socket.id) {
            this.logger.warn(
                `[handleJoin] User ${user.id} has existing socket ${existingSocketId}, removing old entry (ghost cleanup)`,
            );

            // Clean up old socket entry
            const oldUserData = this.onlineUsers.get(existingSocketId);
            if (oldUserData) {
                this.onlineUsers.delete(existingSocketId);
                this.logger.log(
                    `[handleJoin] Removed ghost socket ${existingSocketId} for user ${user.id}`,
                );
            }

            // Disconnect the old socket if it still exists
            const oldSocket = this.server.sockets.sockets.get(existingSocketId);
            if (oldSocket) {
                this.logger.log(
                    `[handleJoin] Force-disconnecting old socket ${existingSocketId}`,
                );
                oldSocket.disconnect(true);
            }
        }

        // Check for alias change and broadcast system message
        const currentOnlineData = this.onlineUsers.get(socket.id);
        if (
            currentOnlineData &&
            currentOnlineData.user.id === user.id &&
            currentOnlineData.user.alias !== user.alias
        ) {
            const oldAlias = currentOnlineData.user.alias;
            const newAlias = user.alias;
            this.logger.log(
                `[handleJoin] User ${user.id} changed alias: ${oldAlias} -> ${newAlias}`,
            );

            // Create system message
            const systemMsg: Message = {
                id: crypto.randomUUID(),
                text: `L'utente *${oldAlias}* ha modificato il suo alias in *${newAlias}*`,
                senderId: 'system',
                senderAlias: 'System',
                senderGender: 'other',
                timestamp: new Date().toISOString(),
                tenantId: tenant.id,
                roomId: undefined, // Global/Tenant level
            };

            // Broadcast system message to tenant room
            this.server.to(`tenant:${tenantSlug}`).emit('newMessage', systemMsg);
        }

        // Update tracking maps
        this.userSocketMap.set(user.id, socket.id);

        // Initialize with tenant data
        const userEntry = {
            user,
            tenantId: tenant.id,
            tenantSlug,
            rooms: [] as string[],
        };
        this.onlineUsers.set(socket.id, userEntry);

        // PERSISTENCE: Update user profile in DB on join/update
        // Only accept URL-based images (reject base64 data URIs to prevent bloat)
        const imageValue = (user as any).image || null;
        const safeImage = imageValue && !imageValue.startsWith('data:') ? imageValue : undefined;

        try {
            await this.prisma.user.update({
                where: { id: user.id },
                data: {
                    name: user.alias,
                    status: (user as any).status || null,
                    ...(safeImage !== undefined ? { image: safeImage } : {}),
                },
            });
            this.logger.debug(
                `Persisted profile for user ${user.id} (${user.alias})`,
            );
        } catch (error: any) {
            this.logger.error(
                `Failed to persist profile for user ${user.id}: ${error.message}`,
            );
        }

        // Update socket data for saving messages
        if (socket.data.user) {
            socket.data.user.tenantId = tenant.id;
            socket.data.user.alias = user.alias; // CRITICAL: Update alias in socket data
        } else {
            socket.data.user = {
                id: user.id,
                alias: user.alias,
                tenantId: tenant.id,
            };
        }

        // Join tenant lobby
        socket.join(`tenant:${tenantSlug}`);
        socket.data.tenantSlug = tenantSlug;

        // Join user's private room
        socket.join(user.id);

        // Join all tenant rooms to ensure receiving broadcasts
        if (tenant && tenant.rooms) {
            const roomIds = tenant.rooms.map((r: any) => r.id);
            this.logger.log(
                `User ${user.id} joining ${roomIds.length} rooms for tenant ${tenantSlug}`,
            );
            roomIds.forEach((roomId: string) => {
                socket.join(roomId);
                this.logger.debug(`User ${user.id} joined room: ${roomId}`);
            });
            socket.data.rooms = roomIds;
            // Also update the onlineUsers map entry!
            userEntry.rooms = roomIds;
        } else {
            this.logger.warn(`No rooms found for tenant ${tenantSlug} during join`);
        }

        this.logger.log(
            `[handleJoin] Completed: user=${user.id} tenant=${tenantSlug} rooms_count=${socket.rooms.size}`,
        );

        // Emit blocked users list to the joining socket
        const blockedIds = await this.chatService.getBlockedUserIds(user.id);
        socket.emit('blockedUsers', { blockedIds });

        // CRITICAL: Immediately broadcast presence update to all users in tenant
        this.logger.log(
            `[handleJoin] Broadcasting presence for tenant ${tenantSlug}`,
        );
        await this.broadcastPresence(tenantSlug);
    }

    @SubscribeMessage('sendMessage')
    async handleMessage(
        @ConnectedSocket() socket: CustomSocket,
        @MessageBody() message: Message,
    ) {
        this.logger.log(`[handleMessage] Received message from ${socket.id}`);

        if (!message?.text && !message?.imageUrl) {
            this.logger.warn('[handleMessage] No message text or image provided');
            return;
        }

        const userData = this.onlineUsers.get(socket.id);
        if (!userData) {
            this.logger.warn(
                `[handleMessage] No userData found for socket ${socket.id}`,
            );
            return;
        }

        this.logger.log(
            `[handleMessage] User data (onlineUsers): ${JSON.stringify(userData)}`,
        );
        this.logger.log(
            `[handleMessage] Socket data (user): ${JSON.stringify(socket.data.user)}`,
        );
        this.logger.log(
            `[handleMessage] Socket rooms: ${Array.from(socket.rooms).join(', ')}`,
        );

        // Rate limiting
        const now = Date.now();
        const lastTime = this.lastMessageTime.get(socket.id) || 0;
        if (now - lastTime < this.RATE_LIMIT_MS) {
            socket.emit('rateLimited', {
                retryAfter: this.RATE_LIMIT_MS - (now - lastTime),
            });
            return;
        }
        this.lastMessageTime.set(socket.id, now);

        // Security: Check for Announcement Room restrictions
        if (message.roomId) {
            const room = await this.prisma.room.findUnique({
                where: { id: message.roomId },
            });
            if (room?.type === 'ANNOUNCEMENT') {
                const canModerate = await this.tenantService.canModerate(
                    socket.data.user.id,
                    userData.tenantSlug,
                );
                if (!canModerate) {
                    this.logger.warn(
                        `[handleMessage] Unauthorized attempt to post to ANNOUNCEMENT room ${message.roomId} by user ${socket.data.user.id}`,
                    );
                    socket.emit('error', {
                        message: 'Only admins can post in this room',
                    });
                    return;
                }
            }
        }

        // Sanitize text if present
        const sanitizedText = message.text ? this.sanitizeText(message.text) : '';

        // Final check: message must have text OR an image
        if (!sanitizedText && !message.imageUrl) {
            this.logger.warn(
                `[handleMessage] Message rejected: no text and no image`,
            );
            return;
        }

        message.text = sanitizedText;
        message.timestamp = new Date().toISOString();

        // Save to DB via ChatService
        const targetTenantId = socket.data.user?.tenantId || userData.tenantId;
        if (targetTenantId) {
            this.logger.log(
                `[handleMessage] Saving message to DB for tenant ${targetTenantId}`,
            );
            await this.chatService.saveMessage(message, targetTenantId);

            // Task 1: Re-open conversation if it was hidden
            if (message.recipientId) {
                await this.chatService.unhideConversation(
                    message.recipientId,
                    message.senderId,
                    targetTenantId,
                );
                // Also unhide for sender if they had it hidden
                await this.chatService.unhideConversation(
                    message.senderId,
                    message.recipientId,
                    targetTenantId,
                );
            }
        } else {
            this.logger.warn(
                `[handleMessage] No tenantId found in socket.data or userData, message not saved to DB`,
            );
        }

        // Route message
        if (message.recipientId) {
            // Check if blocked (bidirectional)
            const blocked = await this.chatService.isBlocked(message.senderId, message.recipientId);
            if (blocked) {
                this.logger.log(`[handleMessage] Message blocked: ${message.senderId} <-> ${message.recipientId}`);
                return;
            }

            // Private message
            const recipientRoomSize =
                this.server.sockets.adapter.rooms.get(message.recipientId)?.size || 0;
            const senderRoomSize =
                this.server.sockets.adapter.rooms.get(message.senderId)?.size || 0;

            this.logger.log(
                `[handleMessage] Private: ${message.senderId} -> ${message.recipientId} (Recip Sockets: ${recipientRoomSize}, Sender Sockets: ${senderRoomSize})`,
            );

            // Emit to recipient's personal room
            this.server.to(message.recipientId).emit('privateMessage', message);
            // Emit back to sender's own personal room (handles multiple sessions/tabs for the same user)
            this.server.to(message.senderId).emit('privateMessage', message);
        } else if (message.roomId) {
            // Room message
            this.logger.log(
                `[handleMessage] Broadcasting to room ${message.roomId} (rooms in socket: ${Array.from(this.server.sockets.adapter.rooms.get(message.roomId) || []).join(', ')})`,
            );
            this.server.to(message.roomId).emit('newMessage', message);
        } else {
            // Fallback global
            this.logger.log(
                `[handleMessage] Broadcasting to tenant:${userData.tenantSlug}`,
            );
            this.server
                .to(`tenant:${userData.tenantSlug}`)
                .emit('newMessage', message);
        }
    }

    @SubscribeMessage('deleteMessage')
    async handleDeleteMessage(
        @ConnectedSocket() socket: CustomSocket,
        @MessageBody()
        data: { messageId: string; roomId?: string; tenantSlug: string },
    ) {
        const { messageId, roomId, tenantSlug } = data;
        if (!messageId || !tenantSlug || !socket.data.user?.tenantId) return;

        // Verify permissions via TenantService
        const canModerate = await this.tenantService.canModerate(
            socket.data.user.id,
            tenantSlug,
        );
        if (!canModerate) {
            socket.emit('error', { message: 'Unauthorized' });
            return;
        }

        // Delete from DB via ChatService
        const deleted = await this.chatService.deleteMessage(
            messageId,
            socket.data.user.tenantId,
        );
        if (!deleted) return;

        // Broadcast deletion
        if (roomId) {
            this.server.to(roomId).emit('messageDeleted', { messageId, roomId });
        } else {
            this.server
                .to(`tenant:${tenantSlug}`)
                .emit('messageDeleted', { messageId });
        }
    }

    @SubscribeMessage('blockUser')
    async handleBlockUser(
        @ConnectedSocket() socket: CustomSocket,
        @MessageBody() data: { blockedId: string },
    ) {
        const userId = socket.data.user?.id;
        if (!userId || !data?.blockedId) return;

        this.logger.log(`[handleBlockUser] User ${userId} blocking ${data.blockedId}`);
        await this.chatService.blockUser(userId, data.blockedId);
        socket.emit('userBlocked', { blockedId: data.blockedId });
    }

    @SubscribeMessage('unblockUser')
    async handleUnblockUser(
        @ConnectedSocket() socket: CustomSocket,
        @MessageBody() data: { blockedId: string },
    ) {
        const userId = socket.data.user?.id;
        if (!userId || !data?.blockedId) return;

        this.logger.log(`[handleUnblockUser] User ${userId} unblocking ${data.blockedId}`);
        await this.chatService.unblockUser(userId, data.blockedId);
        socket.emit('userUnblocked', { unblockedId: data.blockedId });
    }

    @SubscribeMessage('reportUser')
    async handleReportUser(
        @ConnectedSocket() socket: CustomSocket,
        @MessageBody() data: { accusedId: string; reason: string; details?: string; context?: any[] },
    ) {
        const userId = socket.data.user?.id;
        const tenantId = socket.data.user?.tenantId;
        if (!userId || !tenantId || !data?.accusedId || !data?.reason) return;

        this.logger.log(`[handleReportUser] User ${userId} reporting ${data.accusedId} for ${data.reason}`);
        await this.chatService.createReport(
            userId,
            data.accusedId,
            data.reason,
            data.details,
            data.context,
            tenantId,
        );
        socket.emit('reportSubmitted');
    }

    @SubscribeMessage('hideConversation')
    async handleHideConversation(
        @ConnectedSocket() socket: CustomSocket,
        @MessageBody() data: { peerId: string; tenantSlug: string },
    ) {
        const { peerId, tenantSlug } = data;
        const userId = socket.data.user?.id;
        if (!peerId || !tenantSlug || !userId || !socket.data.user?.tenantId)
            return;

        this.logger.log(
            `[handleHideConversation] User ${userId} hiding conversation with ${peerId} in tenant ${tenantSlug}`,
        );

        // Persist to DB
        await this.chatService.hideConversation(
            userId,
            peerId,
            socket.data.user.tenantId,
        );

        // Optional: emit confirmation back
        socket.emit('conversationHidden', { peerId });
    }

    private async broadcastPresence(tenantSlug: string) {
        const tenantUsers = Array.from(this.onlineUsers.entries())
            .filter(([_, data]) => data.tenantSlug === tenantSlug)
            .map(([socketId, data]) => {
                const user = { ...data.user, socketId };
                // Strip base64 images from presence broadcasts to prevent bloat
                if ((user as any).image && (user as any).image.startsWith('data:')) {
                    (user as any).image = undefined;
                }
                return user;
            });

        const onlineIds = Array.from(new Set(tenantUsers.map((u) => u.id)));

        // Calculate counts for each room in this tenant
        const roomCounts: Record<string, number> = {};

        // Get tenant to know which rooms to check
        const tenant = await this.chatService.getTenantBySlug(tenantSlug);
        if (tenant && tenant.rooms) {
            for (const room of tenant.rooms) {
                const roomObj = this.server.sockets.adapter.rooms.get(room.id);
                if (roomObj) {
                    // We want unique USERS, not sockets.
                    // This is slightly complex since adapter only gives socket IDs.
                    const socketIdsInRoom = Array.from(roomObj);
                    const uniqueUserIds = new Set();
                    for (const sId of socketIdsInRoom) {
                        const uData = this.onlineUsers.get(sId);
                        if (uData) uniqueUserIds.add(uData.user.id);
                    }
                    roomCounts[room.id] = uniqueUserIds.size;
                } else {
                    roomCounts[room.id] = 0;
                }
            }
        }

        this.server.to(`tenant:${tenantSlug}`).emit('presenceUpdate', {
            users: tenantUsers,
            onlineIds,
            roomCounts,
        });
    }

    private sanitizeAlias(alias: string | undefined, fallback: string): string {
        if (!alias || typeof alias !== 'string') return fallback;
        const sanitized = alias
            .trim()
            .replace(/[^a-zA-Z0-9 \-_\u00C0-\u024F]/g, '') // Allow alphanumeric, spaces, hyphens, underscores, accented chars
            .substring(0, 30);
        return sanitized.length > 0 ? sanitized : fallback;
    }

    private sanitizeText(text: string): string {
        if (typeof text !== 'string') return '';
        return text.replace(/<[^>]*>/g, '').trim();
    }
}
