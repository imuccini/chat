'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createTenantAction(formData: FormData) {
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const nasIds = (formData.get('nasIds') as string).split(',').map(s => s.trim()).filter(Boolean);
    const publicIps = (formData.get('publicIps') as string || "").split(',').map(s => s.trim()).filter(Boolean);

    await prisma.tenant.create({
        data: {
            name,
            slug,
            devices: {
                create: [
                    ...nasIds.map(nasId => ({ nasId })),
                    ...publicIps.map(ip => ({ publicIp: ip }))
                ]
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
    const publicIps = (formData.get('publicIps') as string || "").split(',').map(s => s.trim()).filter(Boolean);

    // Update basic info
    await prisma.tenant.update({
        where: { id },
        data: { name, slug }
    });

    // Sync devices: Delete all and recreate
    await prisma.nasDevice.deleteMany({ where: { tenantId: id } });

    const devicesToCreate = [
        ...nasIds.map(nasId => ({ nasId, tenantId: id })),
        ...publicIps.map(ip => ({ publicIp: ip, tenantId: id }))
    ];

    if (devicesToCreate.length > 0) {
        await prisma.nasDevice.createMany({
            data: devicesToCreate
        });
    }

    revalidatePath('/admin/dashboard');
}

export async function deleteTenantAction(formData: FormData) {
    const id = formData.get('id') as string;
    await prisma.tenant.delete({ where: { id } });
    revalidatePath('/admin/dashboard');
}
