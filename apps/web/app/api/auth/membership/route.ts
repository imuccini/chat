import { prisma } from "@/lib/db";
import { authorizeTenant } from "@/lib/authorize";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getCorsHeaders, handleOptions } from "@/lib/cors";
import { resolveSession } from "@/lib/session";

export async function OPTIONS(req: Request) {
    return handleOptions(req);
}

export async function GET(request: Request) {
    const origin = request.headers.get('origin');
    const { searchParams } = new URL(request.url);
    const tenantId = searchParams.get('tenantId');
    const bssid = searchParams.get('bssid') || undefined;

    if (!tenantId) {
        return withCors(NextResponse.json({ error: "Missing tenantId" }, { status: 400 }), origin);
    }

    const h = request.headers;
    const cookieHeader = h.get("cookie") || "";

    // Resolve session: tries BetterAuth first, then falls back to direct cookie+Prisma lookup
    const resolved = await resolveSession(h);

    console.log("[API Membership] TenantId:", tenantId, "User:", resolved?.user?.id);

    if (!resolved?.user) {
        return withCors(NextResponse.json({
            isMember: false,
            isAuthorized: false,
            debug: {
                hasCookie: !!cookieHeader,
                host: h.get("host")
            }
        }), origin);
    }

    const session = { user: resolved.user };


    // Get public IP for Double-Lock
    const forwarded = (await headers()).get("x-forwarded-for");
    const publicIp = forwarded ? forwarded.split(/, /)[0] : "127.0.0.1";

    try {
        const { membership, isSuperadmin } = await authorizeTenant(session.user.id, tenantId, {
            bssid,
            publicIp
        }, h);

        return withCors(NextResponse.json({
            isMember: true,
            isAuthorized: true,
            isSuperadmin,
            membership,
            debug: {
                userId: session.user.id,
                tenantId,
                isSuperadminCheck: isSuperadmin
            }
        }), origin);
    } catch (error: any) {
        // If it's just a hardware check failed, we might still be a member but not "authorized" for admin actions
        const membership = await (prisma as any).tenantMember.findUnique({
            where: {
                userId_tenantId: {
                    userId: session.user.id,
                    tenantId
                }
            }
        });

        if (membership) {
            return withCors(NextResponse.json({
                isMember: true,
                isAuthorized: false,
                membership,
                reason: error.message
            }), origin);
        }

        return withCors(NextResponse.json({
            isMember: false,
            isAuthorized: false,
            reason: error.message
        }), origin);
    }
}

function withCors(res: NextResponse, origin: string | null) {
    const corsHeaders = getCorsHeaders(origin);
    Object.entries(corsHeaders).forEach(([key, value]) => {
        res.headers.set(key, value);
    });
    return res;
}
