import { cache } from 'react';
import { prisma } from '@/lib/db';
import { headers } from 'next/headers';

/**
 * Resolves the Tenant ID (slug) based on:
 * 1. URL Parameter (nas_id)
 * 2. Request IP (VPN or Public)
 */
export const resolveTenant = cache(async (urlNasId?: string): Promise<string | null> => {
    // 1. Priority: URL Parameter
    if (urlNasId) {
        const device = await prisma.nasDevice.findUnique({
            where: { nasId: urlNasId },
            include: { tenant: true }
        });
        if (device?.tenant?.slug) return device.tenant.slug;
    }

    // 2. Priority: Request IP
    const headersList = await headers();
    // Helper to get real IP (handles x-forwarded-for if behind proxy)
    const forwardedFor = headersList.get('x-forwarded-for');
    const remoteIp = forwardedFor ? forwardedFor.split(',')[0].trim() : null;

    // In dev, ip might be ::1 or 127.0.0.1, usually strictly ignored or mapped to localhost
    if (!remoteIp) return null;

    const deviceByIp = await prisma.nasDevice.findFirst({
        where: {
            OR: [
                { vpnIp: remoteIp },
                { publicIp: remoteIp }
            ]
        },
        include: { tenant: true }
    });

    if (deviceByIp?.tenant?.slug) return deviceByIp.tenant.slug;

    return null;
});

/**
 * Helper to check if a resolved tenant is valid and redirect/handle if not.
 * Can be used in layouts.
 */
export const getTenantOrNull = async (searchParams: { [key: string]: string | string[] | undefined }) => {
    const nasId = typeof searchParams.nas_id === 'string' ? searchParams.nas_id : undefined;
    const tenantSlug = await resolveTenant(nasId);
    return tenantSlug;
}
