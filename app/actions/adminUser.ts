'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { isGlobalAdmin } from '@/lib/authorize';

export async function createUserAction(formData: FormData) {
    // Authorization check: Only SUPERADMIN can create global users
    const { isSuperadmin } = await isGlobalAdmin();

    if (!isSuperadmin) {
        throw new Error("Unauthorized: Only superadmins can create users");
    }

    const name = formData.get('name') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const email = formData.get('email') as string || null;

    if (!name || !phoneNumber) {
        throw new Error("Name and Phone Number are required");
    }

    await prisma.user.create({
        data: {
            name,
            phoneNumber,
            email,
            role: 'USER' // Default to normal user role globally
        }
    });

    revalidatePath('/admin/users');
}
