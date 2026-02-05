'use server';

import { prisma } from '@/lib/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(state: any, formData: FormData) {
    const password = formData.get('password');
    const username = formData.get('username');

    // Hardcoded credentials as requested
    if (username === 'admin' && password === 'admin') {
        // Ensure a SUPERADMIN user exists in the database for RBAC reconciliation
        await prisma.user.upsert({
            where: { email: 'admin@treno.chat' },
            update: { role: 'SUPERADMIN' },
            create: {
                name: 'System Admin',
                email: 'admin@treno.chat',
                role: 'SUPERADMIN'
            }
        });

        (await cookies()).set('admin_session', 'true', { httpOnly: true, path: '/' });
        redirect('/admin/dashboard');
    } else {
        return { error: 'Invalid credentials' };
    }
}

export async function logoutAction() {
    (await cookies()).delete('admin_session');
    redirect('/admin/login');
}
