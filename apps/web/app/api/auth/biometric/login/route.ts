
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

        // 3. Create Session via Better-Auth
        // We use the internal `auth` instance to create a session for this user
        // This mimics a successful login
        const session = await auth.api.createSession({
            userId: bioToken.userId,
            headers: req.headers
        });

        if (!session) {
            return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
        }

        const response = NextResponse.json({
            success: true,
            session
        });

        // Set the session cookie manually if needed, although Better-Auth might handle it via headers
        // Since we are calling this from native, we likely rely on the response JSON

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
