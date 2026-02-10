
import { NextRequest, NextResponse } from 'next/server';
import { getCorsHeaders, handleOptions } from '@/lib/cors';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import crypto from 'crypto';

export async function OPTIONS(req: Request) {
    return handleOptions(req);
}

export async function POST(req: NextRequest) {
    const origin = req.headers.get('origin');

    try {
        const body = await req.json();
        const { deviceId, sessionToken } = body;

        // Try multiple auth methods (cookies may not work on native)
        let userId: string | null = null;

        // 1. Try BetterAuth session from cookie
        const Session = await auth.api.getSession({
            headers: await headers()
        });

        if (Session?.user) {
            userId = Session.user.id;
        }

        // 2. Fallback: Try Authorization header (Bearer token)
        if (!userId) {
            const authHeader = req.headers.get('authorization');
            if (authHeader?.startsWith('Bearer ')) {
                const token = authHeader.slice(7);
                const { prisma } = await import('@/lib/db');
                const session = await prisma.session.findFirst({
                    where: {
                        token,
                        expiresAt: { gt: new Date() }
                    },
                    include: { user: true }
                });
                if (session?.user) {
                    userId = session.user.id;
                }
            }
        }

        // 3. Fallback: Try sessionToken from body (native apps)
        if (!userId && sessionToken) {
            const { prisma } = await import('@/lib/db');
            const session = await prisma.session.findFirst({
                where: {
                    token: sessionToken,
                    expiresAt: { gt: new Date() }
                },
                include: { user: true }
            });
            if (session?.user) {
                userId = session.user.id;
            }
        }

        if (!userId) {
            console.error('[Biometric Setup] No valid session found via any method');
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!deviceId) {
            return NextResponse.json({ error: 'Device ID required' }, { status: 400 });
        }

        const { prisma } = await import('@/lib/db');

        // Generate a secure random token
        const token = crypto.randomBytes(32).toString('hex');

        // Store in DB linked to user
        await prisma.biometricToken.create({
            data: {
                token,
                userId,
                deviceId,
                // Optional: set expiresAt in the future
            }
        });

        const response = NextResponse.json({
            success: true,
            token
        });

        const corsHeaders = getCorsHeaders(origin);
        Object.entries(corsHeaders).forEach(([key, value]) => {
            response.headers.set(key, value);
        });

        return response;

    } catch (error: any) {
        console.error('[Biometric Setup] Error:', error);
        return NextResponse.json({ error: error.message || 'Setup failed' }, { status: 500 });
    }
}
