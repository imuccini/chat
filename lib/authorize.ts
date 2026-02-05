import { prisma } from "./db";
import { TenantRole, GlobalRole } from "@prisma/client";
import { cookies } from "next/headers";
import { auth } from "./auth";
import { headers } from "next/headers";

interface ConnectionContext {
    bssid?: string;
    publicIp?: string;
}

/**
 * Checks if the current context is a global administrator (Superadmin).
 * Validates either a Better Auth session with role 'SUPERADMIN' 
 * OR the legacy hardcoded 'admin_session' cookie.
 */
export async function isGlobalAdmin() {
    // 1. Check Better Auth Session
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (session?.user?.role === GlobalRole.SUPERADMIN) {
        return { user: session.user, isSuperadmin: true };
    }

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
export async function authorizeTenant(userId: string, tenantId: string, context: ConnectionContext) {
    // 0. Check for Global Admin (Superadmin bypass)
    const { isSuperadmin } = await isGlobalAdmin();
    const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });

    if (!tenant) throw new Error("Tenant not found");

    if (isSuperadmin) {
        return { tenant, membership: null, isSuperadmin: true };
    }

    // 1. Fetch User and Membership
    const membership = await prisma.tenantMember.findUnique({
        where: {
            userId_tenantId: {
                userId,
                tenantId
            }
        }
    });

    if (!membership) {
        throw new Error("User is not a member of this tenant");
    }

    // 2. Hardware-Context Validation (Double-Lock)
    // If tenant has BSSID or staticIp configured, we MUST match at least one if provided
    const hasHardwareConstraints = !!(tenant.bssid || tenant.staticIp);

    if (hasHardwareConstraints) {
        let isContextValid = false;

        // Check BSSID match
        if (tenant.bssid && context.bssid === tenant.bssid) {
            isContextValid = true;
        }

        // Check IP match
        if (!isContextValid && tenant.staticIp && context.publicIp === tenant.staticIp) {
            isContextValid = true;
        }

        if (!isContextValid) {
            throw new Error("Unauthorized: Location-based security check failed (BSSID/IP mismatch)");
        }
    }

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
    if (membership.role === TenantRole.ADMIN) return true;
    return !!membership[permission];
}
