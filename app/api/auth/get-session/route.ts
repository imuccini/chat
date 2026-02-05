import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: Request) {
    const cookieHeader = req.headers.get("cookie") || "";

    // Extract better-auth.session_token from cookie manually
    const sessionTokenMatch = cookieHeader.match(/better-auth\.session_token=([^;]+)/);
    const sessionToken = sessionTokenMatch ? decodeURIComponent(sessionTokenMatch[1]) : null;

    if (!sessionToken) {
        return NextResponse.json({ session: null, user: null });
    }

    // Query session directly with Prisma
    const dbSession = await prisma.session.findFirst({
        where: { token: sessionToken },
        include: { user: true }
    });

    if (!dbSession || dbSession.expiresAt < new Date()) {
        return NextResponse.json({ session: null, user: null });
    }

    // Return in the format expected by better-auth client
    return NextResponse.json({
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
}
