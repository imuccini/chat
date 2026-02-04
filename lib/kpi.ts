import { prisma } from './db';

export async function getAdminKpis() {
    const now = new Date();
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const last30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // 1. Total Users
    const totalUsers = await prisma.user.count();

    // 2. Total Messages
    const totalMessages = await prisma.message.count();

    // 3. Active Users per Tenant (24h)
    // We aggregate unique senderIds from Messages in the last 24h
    const messagesLast24h = await prisma.message.findMany({
        where: { createdAt: { gte: last24h } },
        select: { tenantId: true, senderId: true }
    });

    const activeUsersPerTenant: Record<string, Set<string>> = {};
    messagesLast24h.forEach(m => {
        if (!activeUsersPerTenant[m.tenantId]) {
            activeUsersPerTenant[m.tenantId] = new Set();
        }
        activeUsersPerTenant[m.tenantId].add(m.senderId);
    });

    const tenantActiveCounts: Record<string, number> = {};
    Object.keys(activeUsersPerTenant).forEach(tid => {
        tenantActiveCounts[tid] = activeUsersPerTenant[tid].size;
    });

    // 4. Anonymous vs Authenticated split (all time)
    // Anonymous = userId is null in Message model
    const anonMessages = await prisma.message.count({ where: { userId: null } });
    const authMessages = totalMessages - anonMessages;

    // 5. Daily Trends (last 30 days) - Raw query for performance/convenience
    const messageTrend: any[] = await prisma.$queryRaw`
        SELECT 
            DATE_TRUNC('day', "createdAt") as day, 
            COUNT(*)::int as count
        FROM "Message"
        WHERE "createdAt" >= ${last30d}
        GROUP BY day
        ORDER BY day ASC
    `;

    const userTrend: any[] = await prisma.$queryRaw`
        SELECT 
            DATE_TRUNC('day', "createdAt") as day, 
            COUNT(DISTINCT "senderId")::int as count
        FROM "Message"
        WHERE "createdAt" >= ${last30d}
        GROUP BY day
        ORDER BY day ASC
    `;

    return {
        totalUsers,
        totalMessages,
        tenantActiveCounts,
        split: {
            anonymous: anonMessages,
            authenticated: authMessages
        },
        trends: {
            messages: messageTrend.map(t => ({ day: t.day.toISOString().split('T')[0], count: t.count })),
            users: userTrend.map(t => ({ day: t.day.toISOString().split('T')[0], count: t.count }))
        }
    };
}
