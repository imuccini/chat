import { NextResponse } from 'next/server';
import { sendSMS } from '@/lib/bulkgate';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { phone } = await req.json();

        if (!phone) {
            return NextResponse.json({ error: "Numero di telefono mancante" }, { status: 400 });
        }

        // Basic validation (Italian numbers mostly)
        // Clean spaces and ensure +39
        const cleanPhone = phone.replace(/\s/g, '');
        if (!/^\+39\d{9,10}$/.test(cleanPhone)) {
            return NextResponse.json({ error: "Formato numero non valido. Usa +39..." }, { status: 400 });
        }

        // Generate 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Expire in 5 minutes
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        // Save to Verification table
        // We use the phone number as the 'identifier'
        await prisma.verification.create({
            data: {
                identifier: cleanPhone,
                value: otp,
                expiresAt: expiresAt
            }
        });

        // Send SMS
        const result = await sendSMS(cleanPhone, `Il tuo codice di verifica è: ${otp}`);

        if (result.success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: "Errore nell'invio dell'SMS" }, { status: 500 });
        }

    } catch (e) {
        console.error("OTP Send Error:", e);
        return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
    }
}
