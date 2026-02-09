'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { isGlobalAdmin } from '@/lib/authorize';

// Fetch rooms for a specific tenant
export async function getTenantRoomsAction(tenantId: string) {
    const { isSuperadmin } = await isGlobalAdmin();
    if (!isSuperadmin) throw new Error("Unauthorized: Superadmin access required");

    const rooms = await prisma.room.findMany({
        where: { tenantId },
        orderBy: { createdAt: 'asc' }
    });

    return rooms;
}

// Update room name
export async function updateRoomNameAction(roomId: string, name: string) {
    const { isSuperadmin } = await isGlobalAdmin();
    if (!isSuperadmin) throw new Error("Unauthorized: Superadmin access required");

    await prisma.room.update({
        where: { id: roomId },
        data: { name }
    });

    // Revalidate relevant paths
    revalidatePath('/admin/tenants');
}
