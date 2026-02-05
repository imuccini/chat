import type { Socket } from 'socket.io';

// ============ User Types ============
export type Gender = 'male' | 'female' | 'other';

export interface User {
    id: string;
    alias: string;
    gender: Gender;
    status?: string;
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
    user: { id: string; alias: string; tenantId?: string | null };
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
    presenceUpdate: (users: User[]) => void;
    messageDeleted: (data: { messageId: string; roomId?: string }) => void;
    privateMessage: (msg: Message) => void;
    rateLimited: (data: { retryAfter: number }) => void;
    error: (data: { message: string }) => void;
}

export interface ClientToServerEvents {
    join: (data: { user: User; tenantSlug: string }) => void;
    sendMessage: (msg: Message) => void;
    deleteMessage: (data: { messageId: string; roomId?: string; tenantSlug: string }) => void;
}
