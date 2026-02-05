import { prisma } from "./db";
import { TenantRole } from "@prisma/client";

interface ConnectionContext {
    bssid?: string;
    publicIp?: string;
}

/**
 * Authorizes a user for a specific tenant based on their membership AND physical context (Double-Lock).
 * @param userId - The ID of the user to authorize.
 * @param tenantId - The ID of the tenant.
 * @param context - The physical context (BSSID/IP) of the connection.
 * @returns An object containing the membership if authorized, or throws an error.
 */
export async function authorizeTenant(userId: string, tenantId: string, context: ConnectionContext) {
    // 1. Fetch User, Tenant and Membership
    const [user, tenant, membership] = await Promise.all([
        prisma.user.findUnique({ where: { id: userId } }),
        prisma.tenant.findUnique({ where: { id: tenantId } }),
        prisma.tenantMember.findUnique({
            where: {
                userId_tenantId: {
                    userId,
                    tenantId
                }
            }
        })
    ]);

    if (!tenant) {
        throw new Error("Tenant not found");
    }

    // Superadmins can do anything globally
    if (user?.role === 'SUPERADMIN') {
        return { tenant, membership: null, isSuperadmin: true };
    }

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
        membership
    };
}

/**
 * Helper to check specific permissions within a membership.
 */
export function hasPermission(membership: any, permission: "canModerate" | "canManageOrders" | "canViewStats") {
    if (membership.role === TenantRole.ADMIN) return true;
    return !!membership[permission];
}
