import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Cleanup script to delete old anonymous users
 * Run this periodically (e.g., daily via cron job)
 * 
 * Usage:
 *   tsx scripts/cleanup-anonymous-users.ts [days]
 * 
 * Example:
 *   tsx scripts/cleanup-anonymous-users.ts 7  # Delete anonymous users older than 7 days
 */

async function cleanupAnonymousUsers(daysOld: number = 7) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    console.log(`[Cleanup] Deleting anonymous users created before ${cutoffDate.toISOString()}`);

    try {
        // Delete anonymous users and their associated data
        const result = await prisma.user.deleteMany({
            where: {
                isAnonymous: true,
                createdAt: {
                    lt: cutoffDate,
                },
            },
        });

        console.log(`[Cleanup] Successfully deleted ${result.count} anonymous users`);

        // Also cleanup orphaned messages (messages without a sender)
        const messagesResult = await prisma.message.deleteMany({
            where: {
                userId: null,
                createdAt: {
                    lt: cutoffDate,
                },
            },
        });

        console.log(`[Cleanup] Successfully deleted ${messagesResult.count} orphaned messages`);
    } catch (error: any) {
        console.error(`[Cleanup] Error:`, error.message);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

// Get days from command line argument, default to 7
const daysOld = parseInt(process.argv[2]) || 7;

cleanupAnonymousUsers(daysOld)
    .then(() => {
        console.log('[Cleanup] Done!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('[Cleanup] Failed:', error);
        process.exit(1);
    });
