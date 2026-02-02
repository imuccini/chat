'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createTenantAction(formData: FormData) {
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const nasIds = (formData.get('nasIds') as string).split(',').map(s => s.trim()).filter(Boolean);

    await prisma.tenant.create({
        data: {
            name,
            slug,
            devices: {
                create: nasIds.map(nasId => ({ nasId }))
            }
        }
    });
    revalidatePath('/admin/dashboard');
}

export async function updateTenantAction(formData: FormData) {
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const nasIds = (formData.get('nasIds') as string).split(',').map(s => s.trim()).filter(Boolean);

    // Update basic info
    await prisma.tenant.update({
        where: { id },
        data: { name, slug }
    });

    // Since we want to sync the list of NAS IDs, we delete old ones and re-create for simplicity
    // Ideally, we'd diff them, but this is an MVP
    await prisma.nasDevice.deleteMany({ where: { tenantId: id } });

    if (nasIds.length > 0) {
        await prisma.nasDevice.createMany({
            data: nasIds.map(nasId => ({ nasId, tenantId: id }))
        });
    }

    revalidatePath('/admin/dashboard');
}

export async function deleteTenantAction(formData: FormData) {
    const id = formData.get('id') as string;
    await prisma.tenant.delete({ where: { id } });
    revalidatePath('/admin/dashboard');
}
