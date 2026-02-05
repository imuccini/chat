import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuth } from '@/lib/auth'; // Using getAuth to get the correct instance or fallback
import { headers } from 'next/headers';

export async function POST(req: Request) {
    try {
        const { phone, code, alias, gender } = await req.json();

        if (!phone || !code) {
            return NextResponse.json({ error: "Dati mancanti" }, { status: 400 });
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
            return NextResponse.json({ error: "Codice non valido o scaduto" }, { status: 400 });
        }

        // 2. Check User existence
        let user = await prisma.user.findFirst({
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
            }, { status: 200 });
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
                return NextResponse.json({ error: "Alias mancante", isNewUser: true }, { status: 400 });
            }

            user = await prisma.user.create({
                data: {
                    name: alias, // Map alias to name
                    phoneNumber: cleanPhone,
                    gender: gender || 'other',
                    isAnonymous: false,
                    emailVerified: false // Phone verified, but email not
                }
            });
        }

        // 4. Create Session manually using Prisma (since internal API types are tricky)
        // Better Auth session token format usually: base64 string or uuid. 
        // Let's generate a secure token.
        const crypto = require('crypto');
        const token = crypto.randomBytes(32).toString('base64');

        // Session expiry (1 year - effectively "never" log out unless explicit)
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 365);

        const session = await prisma.session.create({
            data: {
                userId: user.id,
                token: token,
                expiresAt: expiresAt,
                ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
                userAgent: req.headers.get('user-agent')
            }
        });

        // Set cookie
        const response = NextResponse.json({
            success: true,
            user: user,
            session: session
        });

        // Set the better-auth.session_token cookie
        // Note: In production with secure cookies, we need Secure; HttpOnly; SameSite=Lax
        response.cookies.set('better-auth.session_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            expires: expiresAt,
            path: '/'
        });

        return response;

    } catch (e: any) {
        console.error("OTP Verify Error:", e);
        return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
    }
}
