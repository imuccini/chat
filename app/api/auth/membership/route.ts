import { prisma } from "@/lib/db";
import { auth, getAuthFromHeaders } from "@/lib/auth";
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
        return NextResponse.json({
            isMember: false,
            isAuthorized: false,
            debug: {
                hasCookie: !!cookieHeader,
                hasToken: !!sessionToken,
                host: h.get("host")
            }
        });
    }


    // Get public IP for Double-Lock
    const forwarded = (await headers()).get("x-forwarded-for");
    const publicIp = forwarded ? forwarded.split(/, /)[0] : "127.0.0.1";

    try {
        const { membership, isSuperadmin } = await authorizeTenant(session.user.id, tenantId, {
            bssid,
            publicIp
        }, h);

        return NextResponse.json({
            isMember: true,
            isAuthorized: true,
            isSuperadmin,
            membership,
            debug: {
                userId: session.user.id,
                tenantId,
                isSuperadminCheck: isSuperadmin
            }
        });
    } catch (error: any) {
        // If it's just a hardware mismatch, we might still be a member but not "authorized" for admin actions
        const isMismatched = error.message.includes("hardware check failed") || error.message.includes("mismatch");

        const membership = await (prisma as any).tenantMember.findUnique({
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
