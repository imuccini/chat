import { prisma } from "@/lib/db";

/**
 * Creates a new message in the database.
 * Used by server actions for persisting chat messages.
 */
export const createMessage = async (text: string, userId: string, tenantId: string) => {
    return await prisma.message.create({
        data: {
            text,
            userId,
            tenantId,
            // Legacy/Socket fields required by schema
            senderId: userId,
            senderAlias: "Unknown",
            senderGender: "other"
        },
    });
};
