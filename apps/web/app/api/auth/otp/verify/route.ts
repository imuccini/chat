import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuth, getAuthFromHeaders } from '@/lib/auth'; // Using getAuth to get the correct instance or fallback
import { headers } from 'next/headers';

const getCorsHeaders = (requestOrigin: string | null) => {
    const allowedOrigins = ["capacitor://localhost", "http://localhost:3000", "http://192.168.1.111:3000"];
    const origin = requestOrigin && (allowedOrigins.includes(requestOrigin) || requestOrigin.startsWith('capacitor://'))
        ? requestOrigin : allowedOrigins[0];
    return {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Cookie',
        'Access-Control-Allow-Credentials': 'true',
    };
};

export async function OPTIONS(req: Request) {
    return new NextResponse(null, { status: 200, headers: getCorsHeaders(req.headers.get('origin')) });
}

export async function POST(req: Request) {
    const corsHeaders = getCorsHeaders(req.headers.get('origin'));

    try {
        const { phone, code, alias, gender } = await req.json();

        if (!phone || !code) {
            return NextResponse.json({ error: "Dati mancanti" }, { status: 400, headers: corsHeaders });
        }

        const cleanPhone = phone.replace(/\s/g, '');

        // 1. Verify OTP
        const verification = await prisma.verification.findFirst({
            where: {
                identifier: cleanPhone,
                value: code,
                expiresAt: { gt: new Date() }
            }
        });

        if (!verification) {
            return NextResponse.json({ error: "Codice non valido o scaduto" }, { status: 400, headers: corsHeaders });
        }

        // 2. Check User existence
        let user = await (prisma as any).user.findFirst({
            where: { phoneNumber: cleanPhone }
        });

        const isNewUser = !user;

        // 3. Handle potentially new user (Probe phase)
        // If user doesn't exist and no alias provided, we return 200 asking for alias.
        // We MUST NOT delete the OTP yet, because the client will send it again with the alias.
        if (!user && !alias) {
            return NextResponse.json({
                success: false,
                isNewUser: true,
                message: "Alias richiesto per nuovi utenti"
            }, { status: 200, headers: corsHeaders });
        }

        // 4. Consume OTP (Delete it) - Now safe to delete as we either have a user or are creating one
        try {
            await prisma.verification.delete({ where: { id: verification.id } });
        } catch (e) {
            console.warn("Failed to delete OTP (might be already deleted)", e);
        }

        // 5. Create User if needed
        if (!user) {
            // Create new user (Alias is guaranteed here due to check above)
            if (!alias) {
                return NextResponse.json({ error: "Alias mancante", isNewUser: true }, { status: 400, headers: corsHeaders });
            }

            user = await (prisma as any).user.create({
                data: {
                    name: alias, // Map alias to name
                    phoneNumber: cleanPhone,
                    gender: gender || 'other',
                    isAnonymous: false,
                    emailVerified: false // Phone verified, but email not
                }
            });
        }

        // 4. Create Session manually using Prisma
        // Testing: better-auth might store raw tokens, not hashed
        const crypto = require('crypto');
        const rawToken = crypto.randomBytes(32).toString('base64');

        // Session expiry (1 year)
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 365);

        await prisma.session.create({
            data: {
                userId: user.id,
                token: rawToken, // Store RAW token (testing hypothesis)
                expiresAt: expiresAt,
                ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
                userAgent: req.headers.get('user-agent')
            }
        });

        // Set cookie with the RAW token (not the hash)
        const response = NextResponse.json({
            success: true,
            user: user
        }, { headers: corsHeaders });

        response.cookies.set('better-auth.session_token', rawToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            expires: expiresAt,
            path: '/'
        });

        return response;

    } catch (e: any) {
        console.error("OTP Verify Error:", e);
        return NextResponse.json({ error: "Errore interno del server" }, { status: 500, headers: corsHeaders });
    }
}
