import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { authorizeTenant } from "@/lib/authorize";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const tenantId = searchParams.get('tenantId');
    const bssid = searchParams.get('bssid') || undefined;

    if (!tenantId) {
        return NextResponse.json({ error: "Missing tenantId" }, { status: 400 });
    }

    const session = await auth.api.getSession({
        headers: await headers()
    });

    console.log("[API Membership] Session:", session?.user?.id, "Name:", session?.user?.name);
    console.log("[API Membership] TenantId:", tenantId);

    if (!session?.user) {
        return NextResponse.json({ isMember: false, isAuthorized: false });
    }

    // Get public IP for Double-Lock
    const forwarded = (await headers()).get("x-forwarded-for");
    const publicIp = forwarded ? forwarded.split(/, /)[0] : "127.0.0.1";

    try {
        const { membership, isSuperadmin } = await authorizeTenant(session.user.id, tenantId, {
            bssid,
            publicIp
        });

        return NextResponse.json({
            isMember: true,
            isAuthorized: true,
            isSuperadmin,
            membership
        });
    } catch (error: any) {
        // If it's just a hardware mismatch, we might still be a member but not "authorized" for admin actions
        const isMismatched = error.message.includes("hardware check failed") || error.message.includes("mismatch");

        const membership = await prisma.tenantMember.findUnique({
            where: {
                userId_tenantId: {
                    userId: session.user.id,
                    tenantId
                }
            }
        });

        if (membership) {
            return NextResponse.json({
                isMember: true,
                isAuthorized: false,
                membership,
                reason: error.message
            });
        }

        return NextResponse.json({
            isMember: false,
            isAuthorized: false,
            reason: error.message
        });
    }
}
