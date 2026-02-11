import { prisma } from "./db";
import { cookies } from "next/headers";
import { headers } from "next/headers";
import { getAuthFromHeaders } from "./auth";

interface ConnectionContext {
    bssid?: string;
    publicIp?: string;
}

export async function isGlobalAdmin(hList?: Headers) {
    // 1. Check Better Auth Session
    const ctxHeaders = hList || await headers();
    const dynamicAuth = await getAuthFromHeaders(ctxHeaders);
    const session = await dynamicAuth.api.getSession({
        headers: ctxHeaders
    });

    console.log("[isGlobalAdmin] Session User Role:", session?.user?.role, "User ID:", session?.user?.id);

    if (session?.user?.role?.toUpperCase() === 'SUPERADMIN') {
        return { user: session.user, isSuperadmin: true };
    }
    // ...

    // 2. Check Legacy Cookie (Bridging admin/admin login)
    const cookieStore = await cookies();
    const isAdminCookie = cookieStore.get('admin_session')?.value === 'true';

    if (isAdminCookie) {
        // Return a structural representation for logic bypass
        return { isSuperadmin: true };
    }

    return { isSuperadmin: false };
}

/**
 * Authorizes a user for a specific tenant based on their membership AND physical context (Double-Lock).
 * @param userId - The ID of the user to authorize.
 * @param tenantId - The ID of the tenant.
 * @param context - The physical context (BSSID/IP) of the connection.
 * @returns An object containing the membership if authorized, or throws an error.
 */
export async function authorizeTenant(userId: string, tenantId: string, context: ConnectionContext, hList?: Headers) {
    if (!tenantId) {
        throw new Error("Tenant ID is required for authorization");
    }

    // 0. Check for Global Admin (Superadmin bypass)
    const { isSuperadmin } = await isGlobalAdmin(hList);
    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });

    console.log("[authorizeTenant] UserId:", userId, "TenantId:", tenantId, "isSuperadmin:", isSuperadmin);

    if (!tenant) throw new Error("Tenant not found");

    if (isSuperadmin) {
        return { tenant, membership: null, isSuperadmin: true };
    }

    // 1. Fetch User and Membership
    const membership = await (prisma as any).tenantMember.findUnique({
        where: {
            userId_tenantId: {
                userId,
                tenantId
            }
        }
    });

    console.log("[authorizeTenant] Membership found:", !!membership);

    if (!membership) {
        throw new Error("User is not a member of this tenant");
    }

    // 2. Hardware-Context Validation (Double-Lock)
    // If tenant has BSSID or staticIp configured, we MUST match at least one if provided
    // BUT: Tenant Admins/Owners can bypass this check (remote management)

    const isTenantAdmin = membership?.role === 'ADMIN' || membership?.role === 'OWNER'; // Assuming OWNER exists in enum or logic, strictly generic logic here confirms ADMIN

    if (isTenantAdmin) {
        console.log("[authorizeTenant] Hardware check bypassed for Tenant Admin:", userId);
        return {
            tenant,
            membership,
            isSuperadmin: false
        };
    }

    const hasHardwareConstraints = !!((tenant as any).bssid || (tenant as any).staticIp);
    console.log("[authorizeTenant] Has constraints:", hasHardwareConstraints);

    if (hasHardwareConstraints) {
        let isContextValid = false;

        // Check BSSID match
        if ((tenant as any).bssid && context.bssid === (tenant as any).bssid) {
            isContextValid = true;
        }

        // Check IP match
        if (!isContextValid && (tenant as any).staticIp && context.publicIp === (tenant as any).staticIp) {
            isContextValid = true;
        }

        console.log("[authorizeTenant] Context valid:", isContextValid, "Client BSSID:", context.bssid, "Tenant BSSID:", (tenant as any).bssid);

        if (!isContextValid) {
            throw new Error("Unauthorized: Location-based security check failed (BSSID/IP mismatch)");
        }
    }

    console.log("[authorizeTenant] Success for user:", userId, "on tenant:", tenantId, "Role:", membership?.role);

    return {
        tenant,
        membership,
        isSuperadmin: false
    };
}

/**
 * Helper to check specific permissions within a membership.
 */
export function hasPermission(membership: any, permission: "canModerate" | "canManageOrders" | "canViewStats") {
    if (membership.role === 'ADMIN') return true;
    return !!membership[permission];
}
