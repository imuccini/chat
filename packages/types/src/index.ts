import type { Socket } from 'socket.io';

// ============ User Types ============
export type Gender = 'male' | 'female' | 'other';

export interface User {
    id: string;
    alias: string;
    gender: Gender;
    status?: string;
    image?: string;
    joinedAt?: number;
}

// ============ Message Types ============
export interface Message {
    id: string;
    text: string;
    senderId: string;
    senderAlias: string;
    senderGender: Gender;
    timestamp: string;
    imageUrl?: string;
    recipientId?: string;
    roomId?: string;
    tenantId?: string;
    isSystem?: boolean;
}

// ============ Room Types ============
export type RoomType = 'ANNOUNCEMENT' | 'GENERAL';

export interface Room {
    id: string;
    name: string;
    description?: string;
    type: RoomType;
    tenantId: string;
}

// ============ Tenant Types ============
export interface Tenant {
    id: string;
    name: string;
    slug: string;
    config?: any;
    rooms?: Room[];
}

// ============ Socket Types ============
export interface SocketData {
    user: { id: string; alias: string; status?: string; image?: string; tenantId?: string | null };
    tenantSlug: string;
    rooms: string[];
    isAnonymous?: boolean;
}

export interface CustomSocket extends Socket {
    data: SocketData;
}

// ============ WebSocket Events ============
export interface ServerToClientEvents {
    newMessage: (msg: Message) => void;
    presenceUpdate: (data: {
        users: User[];
        onlineIds: string[];
        roomCounts: Record<string, number>
    }) => void;
    messageDeleted: (data: { messageId: string; roomId?: string }) => void;
    privateMessage: (msg: Message) => void;
    rateLimited: (data: { retryAfter: number }) => void;
    error: (data: { message: string }) => void;
    userBlocked: (data: { blockedId: string }) => void;
    userUnblocked: (data: { unblockedId: string }) => void;
    reportSubmitted: () => void;
    blockedUsers: (data: { blockedIds: string[] }) => void;
}

export interface ClientToServerEvents {
    join: (data: { user: User; tenantSlug: string }) => void;
    sendMessage: (msg: Message) => void;
    deleteMessage: (data: { messageId: string; roomId?: string; tenantSlug: string }) => void;
    blockUser: (data: { blockedId: string }) => void;
    unblockUser: (data: { blockedId: string }) => void;
    reportUser: (data: { accusedId: string; reason: string; details?: string; context?: any[] }) => void;
}
