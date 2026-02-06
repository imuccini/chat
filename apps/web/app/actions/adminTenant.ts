'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { authorizeTenant, isGlobalAdmin } from '@/lib/authorize';

export async function createTenantAction(formData: FormData) {
    const { isSuperadmin } = await isGlobalAdmin();
    if (!isSuperadmin) throw new Error("Unauthorized: Superadmin access required");

    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const nasIds = (formData.get('nasIds') as string || "").split(',').map(s => s.trim()).filter(Boolean);
    const publicIps = (formData.get('publicIps') as string || "").split(',').map(s => s.trim()).filter(Boolean);
    const bssids = (formData.get('bssids') as string || "").split(',').map(s => s.trim()).filter(Boolean);

    const bssid = bssids[0] || null;
    const staticIp = publicIps[0] || null;

    await prisma.tenant.create({
        data: {
            name,
            slug,
            bssid,
            staticIp,
            devices: {
                create: [
                    ...nasIds.map(nasId => ({ nasId, publicIp: null, bssid: null, vpnIp: null })),
                    ...publicIps.map(ip => ({ publicIp: ip, nasId: null, bssid: null, vpnIp: null })),
                    ...bssids.map(b => ({ bssid: b, nasId: null, publicIp: null, vpnIp: null }))
                ] as any
            },
            rooms: {
                create: [
                    { name: 'Annunci', type: 'ANNOUNCEMENT', description: `Messaggi da ${name}` },
                    { name: name, type: 'GENERAL', description: 'Discussione generale e chat pubblica' }
                ]
            }
        }
    });
    revalidatePath('/admin/tenants');
}

export async function updateTenantAction(formData: FormData) {
    const { isSuperadmin } = await isGlobalAdmin();
    if (!isSuperadmin) throw new Error("Unauthorized: Superadmin access required");

    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const nasIds = (formData.get('nasIds') as string || "").split(',').map(s => s.trim()).filter(Boolean);
    const publicIps = (formData.get('publicIps') as string || "").split(',').map(s => s.trim()).filter(Boolean);
    const bssids = (formData.get('bssids') as string || "").split(',').map(s => s.trim()).filter(Boolean);

    const bssid = bssids[0] || null;
    const staticIp = publicIps[0] || null;

    // Update basic info
    await prisma.tenant.update({
        where: { id },
        data: { name, slug, bssid, staticIp }
    });

    // Sync devices: Delete all and recreate
    await prisma.nasDevice.deleteMany({ where: { tenantId: id } });

    const devicesToCreate = [
        ...nasIds.map(nasId => ({ nasId, tenantId: id, publicIp: null, bssid: null, vpnIp: null })),
        ...publicIps.map(ip => ({ publicIp: ip, tenantId: id, nasId: null, bssid: null, vpnIp: null })),
        ...bssids.map(b => ({ bssid: b, tenantId: id, nasId: null, publicIp: null, vpnIp: null }))
    ];

    if (devicesToCreate.length > 0) {
        await prisma.nasDevice.createMany({
            data: devicesToCreate as any
        });
    }

    revalidatePath('/admin/tenants');
}

export async function deleteTenantAction(formData: FormData) {
    const { isSuperadmin } = await isGlobalAdmin();
    if (!isSuperadmin) throw new Error("Unauthorized: Superadmin access required");

    const id = formData.get('id') as string;
    await prisma.tenant.delete({ where: { id } });
    revalidatePath('/admin/tenants');
}

export async function addTenantMemberAction(formData: FormData) {
    const tenantId = formData.get('tenantId') as string;
    const userId = formData.get('userId') as string;
    const role = formData.get('role') as any; // TenantRole
    const canModerate = formData.get('canModerate') === 'on';
    const canManageOrders = formData.get('canManageOrders') === 'on';
    const canViewStats = formData.get('canViewStats') === 'on';

    const { isSuperadmin, user } = await isGlobalAdmin();
    if (!isSuperadmin && !user) throw new Error("Unauthorized");

    // Double-Lock Authorization
    const forwarded = (await headers()).get("x-forwarded-for");
    const publicIp = forwarded ? forwarded.split(/, /)[0] : "127.0.0.1";

    // authorizeTenant handles the superadmin bypass and membership check
    await authorizeTenant(user?.id || "", tenantId, { publicIp });

    await prisma.tenantMember.create({
        data: {
            tenantId,
            userId,
            role,
            canModerate,
            canManageOrders,
            canViewStats
        }
    });

    revalidatePath('/admin/tenants');
}

export async function removeTenantMemberAction(formData: FormData) {
    const id = formData.get('id') as string;
    const tenantId = formData.get('tenantId') as string;

    const { isSuperadmin, user } = await isGlobalAdmin();
    if (!isSuperadmin && !user) throw new Error("Unauthorized");

    await authorizeTenant(user?.id || "", tenantId, {});

    await prisma.tenantMember.delete({ where: { id } });
    revalidatePath('/admin/tenants');
}

export async function initRoomsAction(formData: FormData) {
    const { isSuperadmin } = await isGlobalAdmin();
    if (!isSuperadmin) throw new Error("Unauthorized: Superadmin access required");

    const tenantId = formData.get('tenantId') as string;

    // Check if tenant exists and get its name
    const tenant = await prisma.tenant.findUnique({
        where: { id: tenantId },
        include: { rooms: true }
    });

    if (!tenant) throw new Error("Tenant not found");

    // Only init if no rooms exist
    if (tenant.rooms.length > 0) {
        throw new Error("Tenant already has rooms");
    }

    // Create default rooms
    await prisma.room.createMany({
        data: [
            { name: 'Annunci', type: 'ANNOUNCEMENT', tenantId, description: `Messaggi da ${tenant.name}` },
            { name: tenant.name, type: 'GENERAL', tenantId, description: 'Discussione generale e chat pubblica' }
        ]
    });

    revalidatePath('/admin/tenants');
}
