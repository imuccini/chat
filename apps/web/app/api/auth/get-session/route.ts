import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCorsHeaders, handleOptions } from '@/lib/cors';

export async function OPTIONS(req: Request) {
    return handleOptions(req);
}

export async function GET(req: Request) {
    const origin = req.headers.get('origin');
    const cookieHeader = req.headers.get("cookie") || "";

    // Extract better-auth.session_token from cookie manually
    const sessionTokenMatch = cookieHeader.match(/better-auth\.session_token=([^;]+)/);
    const sessionToken = sessionTokenMatch ? decodeURIComponent(sessionTokenMatch[1]) : null;

    if (!sessionToken) {
        const res = NextResponse.json({ session: null, user: null });
        return applyCors(res, origin);
    }

    // Query session directly with Prisma
    const dbSession = await prisma.session.findFirst({
        where: { token: sessionToken },
        include: { user: true }
    });

    if (!dbSession || dbSession.expiresAt < new Date()) {
        const res = NextResponse.json({ session: null, user: null });
        return applyCors(res, origin);
    }

    // Return in the format expected by better-auth client
    const res = NextResponse.json({
        session: {
            id: dbSession.id,
            userId: dbSession.userId,
            token: dbSession.token,
            expiresAt: dbSession.expiresAt.toISOString(),
            createdAt: dbSession.createdAt.toISOString(),
            updatedAt: dbSession.updatedAt.toISOString()
        },
        user: {
            id: dbSession.user.id,
            name: dbSession.user.name,
            email: dbSession.user.email,
            image: dbSession.user.image,
            role: dbSession.user.role,
            phoneNumber: dbSession.user.phoneNumber,
            gender: dbSession.user.gender,
            isAnonymous: dbSession.user.isAnonymous,
            createdAt: dbSession.user.createdAt.toISOString(),
            updatedAt: dbSession.user.updatedAt.toISOString()
        }
    });

    return applyCors(res, origin);
}

function applyCors(res: NextResponse, origin: string | null) {
    const corsHeaders = getCorsHeaders(origin);
    Object.entries(corsHeaders).forEach(([key, value]) => {
        res.headers.set(key, value);
    });
    return res;
}
