import { prisma } from './db';
import { getAuthFromHeaders } from './auth';

/**
 * Resolves the current user session from request headers.
 * Tries BetterAuth first, then falls back to manual cookie + Prisma lookup.
 * This handles sessions created outside BetterAuth (e.g., OTP phone login).
 */
export async function resolveSession(headers: Headers) {
    // 1. Try BetterAuth's built-in session resolution
    try {
        const auth = await getAuthFromHeaders(headers);
        const session = await auth.api.getSession({ headers });
        if (session?.user) {
            return { session: session.session, user: session.user };
        }
    } catch (e) {
        // BetterAuth may fail for sessions it didn't create — fall through
    }

    // 2. Fallback: read the session token cookie and look up directly in Prisma
    const cookieHeader = headers.get('cookie') || '';
    const match = cookieHeader.match(/better-auth\.session_token=([^;]+)/);
    const token = match ? decodeURIComponent(match[1]) : null;

    if (!token) return null;

    const dbSession = await prisma.session.findFirst({
        where: { token },
        include: { user: true }
    });

    if (!dbSession || dbSession.expiresAt < new Date()) return null;

    return {
        session: {
            id: dbSession.id,
            userId: dbSession.userId,
            token: dbSession.token,
            expiresAt: dbSession.expiresAt,
        },
        user: dbSession.user,
    };
}
