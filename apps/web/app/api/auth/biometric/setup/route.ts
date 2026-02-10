
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
        const Session = await auth.api.getSession({
            headers: await headers()
        });

        if (!Session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { deviceId } = await req.json();

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
                userId: Session.user.id,
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
