
import { NextRequest, NextResponse } from 'next/server';
import { getCorsHeaders, handleOptions } from '@/lib/cors';
import { auth } from '@/lib/auth';

export async function OPTIONS(req: Request) {
    return handleOptions(req);
}

export async function POST(req: NextRequest) {
    const origin = req.headers.get('origin');

    try {
        const { token, phoneNumber, deviceId } = await req.json();

        if (!token || !phoneNumber) {
            return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
        }

        const { prisma } = await import('@/lib/db');

        // 1. Find the token
        const bioToken = await prisma.biometricToken.findUnique({
            where: { token },
            include: { user: true }
        });

        if (!bioToken) {
            return NextResponse.json({ error: 'Invalid biometric token' }, { status: 401 });
        }

        // 2. Validate User & Phone Match
        // We ensure the token belongs to the user with this phone number
        // This prevents spoofing just by having the token
        if (bioToken.user.phoneNumber !== phoneNumber) {
            return NextResponse.json({ error: 'Phone number mismatch' }, { status: 401 });
        }

        // Optional: Validate Device ID if sent
        if (deviceId && bioToken.deviceId !== deviceId) {
            // Depending on strictness, we might fail or just warn
            console.warn(`[Biometric Login] Device ID mismatch for user ${bioToken.userId}`);
        }

        // 3. Create Session manually (same as OTP flow for consistency)
        // BetterAuth's createSession may not work well with native apps
        const crypto = require('crypto');
        const rawToken = crypto.randomBytes(32).toString('base64');

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 365);

        await prisma.session.create({
            data: {
                userId: bioToken.userId,
                token: rawToken,
                expiresAt,
                ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
                userAgent: req.headers.get('user-agent')
            }
        });

        // Return user data and session token for native apps
        const response = NextResponse.json({
            success: true,
            user: {
                id: bioToken.user.id,
                name: bioToken.user.name,
                alias: bioToken.user.name, // Alias is stored as name
                phoneNumber: bioToken.user.phoneNumber,
                gender: bioToken.user.gender
            },
            sessionToken: rawToken
        });

        // Also set cookie for web apps
        response.cookies.set('better-auth.session_token', rawToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 365 * 24 * 60 * 60,
            path: '/'
        });

        const corsHeaders = getCorsHeaders(origin);
        Object.entries(corsHeaders).forEach(([key, value]) => {
            response.headers.set(key, value);
        });

        return response;

    } catch (error: any) {
        console.error('[Biometric Login] Error:', error);
        return NextResponse.json({ error: error.message || 'Login failed' }, { status: 500 });
    }
}
