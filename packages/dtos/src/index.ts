import { z } from 'zod';

// ============ Message DTOs ============
export const SendMessageSchema = z.object({
    text: z.string().min(1).max(1000),
    roomId: z.string().optional(),
    recipientId: z.string().optional(),
});

export type SendMessageDto = z.infer<typeof SendMessageSchema>;

// ============ User DTOs ============
export const JoinRoomSchema = z.object({
    tenantSlug: z.string().min(1),
    user: z.object({
        id: z.string(),
        alias: z.string().max(30),
        gender: z.enum(['male', 'female', 'other']),
    }),
});

export type JoinRoomDto = z.infer<typeof JoinRoomSchema>;

// ============ Delete Message DTOs ============
export const DeleteMessageSchema = z.object({
    messageId: z.string(),
    roomId: z.string().optional(),
    tenantSlug: z.string(),
});

export type DeleteMessageDto = z.infer<typeof DeleteMessageSchema>;

// Re-export zod for convenience
export { z };
