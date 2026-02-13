import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthFromHeaders } from '@/lib/auth';
import { headers } from 'next/headers';

export async function DELETE(req: Request) {
    try {
        const hList = await headers();
        const auth = await getAuthFromHeaders(hList);
        const session = await auth.api.getSession({ headers: hList });

        if (!session?.user) {
            return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
        }

        const userId = session.user.id;

        // Delete user and all associated data (Prisma onDelete: Cascade should handle most)
        // Better Auth will handle session deletion if we delete the user from DB
        await prisma.user.delete({
            where: { id: userId }
        });

        const response = NextResponse.json({ success: true, message: "Account eliminato permanentemente" });

        // Clear session cookie
        response.cookies.delete('better-auth.session_token');

        return response;
    } catch (e: any) {
        console.error("Account Delete Error:", e);
        return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
    }
}
