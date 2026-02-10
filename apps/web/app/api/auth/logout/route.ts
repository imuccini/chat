import { NextRequest, NextResponse } from 'next/server';
import { getCorsHeaders, handleOptions } from '@/lib/cors';

export async function OPTIONS(req: Request) {
    return handleOptions(req);
}

/**
 * Explicit logout endpoint that handles OTP session cleanup.
 * BetterAuth's signOut() handles its own sessions, but OTP sessions
 * (created via manual Prisma insert) need manual cleanup.
 */
export async function POST(req: NextRequest) {
    const origin = req.headers.get('origin');

    try {
        const { prisma } = await import('@/lib/db');

        // Read session token from cookie
        const cookieHeader = req.headers.get('cookie') || '';
        const match = cookieHeader.match(/better-auth\.session_token=([^;]+)/);
        const token = match ? decodeURIComponent(match[1]) : null;

        if (token) {
            // Delete the session record from DB
            await prisma.session.deleteMany({ where: { token } });
        }

        // Clear the session cookie
        const response = NextResponse.json({ success: true });
        response.cookies.set('better-auth.session_token', '', {
            maxAge: 0,
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
        });

        const corsHeaders = getCorsHeaders(origin);
        Object.entries(corsHeaders).forEach(([key, value]) => {
            response.headers.set(key, value);
        });

        return response;
    } catch (error: any) {
        console.error('[Logout] Error:', error.message);
        return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
    }
}
