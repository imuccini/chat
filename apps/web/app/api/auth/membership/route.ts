import { prisma } from "@/lib/db";
import { authorizeTenant } from "@/lib/authorize";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getCorsHeaders, handleOptions } from "@/lib/cors";

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

    // Extract better-auth.session_token from cookie manually
    const sessionTokenMatch = cookieHeader.match(/better-auth\.session_token=([^;]+)/);
    const sessionToken = sessionTokenMatch ? decodeURIComponent(sessionTokenMatch[1]) : null;

    console.log("[API Membership] Raw Cookie:", cookieHeader.substring(0, 100) + "...");
    console.log("[API Membership] Extracted Token:", sessionToken?.substring(0, 30) + "...");

    // Query session directly with Prisma (bypassing better-auth)
    let session: any = null;
    if (sessionToken) {
        const dbSession = await prisma.session.findFirst({
            where: { token: sessionToken },
            include: { user: true }
        });
        if (dbSession && dbSession.expiresAt > new Date()) {
            session = { user: dbSession.user, session: dbSession };
            console.log("[API Membership] Session found via Prisma:", dbSession.user?.id);
        } else {
            console.log("[API Membership] Session not found or expired");
        }
    }

    console.log("[API Membership] TenantId:", tenantId);

    if (!session?.user) {
        return withCors(NextResponse.json({
            isMember: false,
            isAuthorized: false,
            debug: {
                hasCookie: !!cookieHeader,
                hasToken: !!sessionToken,
                host: h.get("host")
            }
        }), origin);
    }


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
