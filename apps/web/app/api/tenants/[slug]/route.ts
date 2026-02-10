import { NextRequest, NextResponse } from 'next/server';
import { getCorsHeaders, handleOptions } from '@/lib/cors';

export async function OPTIONS(req: Request) {
    return handleOptions(req);
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const origin = request.headers.get('origin');

    // Always use localhost for server-side API calls
    const apiUrl = 'http://localhost:3001';
    const fullUrl = `${apiUrl}/api/tenants/${slug}`;

    console.log(`[Next.js Proxy] GET /api/tenants/${slug} -> ${fullUrl} | Origin: ${origin}`);

    try {
        const response = await fetch(fullUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        console.log(`[Next.js Proxy] Response: ${response.status}`, JSON.stringify(data).substring(0, 100));

        const res = NextResponse.json(data, { status: response.ok ? 200 : response.status });
        return withCors(res, origin);
    } catch (error) {
        console.error('[Next.js Proxy] Error:', error);
        return withCors(NextResponse.json(
            { error: 'Failed to fetch tenant' },
            { status: 500 }
        ), origin);
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const origin = request.headers.get('origin');

    try {
        // 1. Resolve session (handles both BetterAuth and OTP-created sessions)
        const { resolveSession } = await import('@/lib/session');
        const { authorizeTenant } = await import('@/lib/authorize');
        const { headers } = await import('next/headers');

        const hList = await headers();
        const resolved = await resolveSession(hList);
        const user = resolved?.user;

        if (!user) {
            return withCors(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }), origin);
        }

        // 2. Fetch tenant and check admin authorization
        const { prisma } = await import('@/lib/db');
        const tenant = await prisma.tenant.findUnique({ where: { slug } });

        if (!tenant) {
            return withCors(NextResponse.json({ error: 'Tenant not found' }, { status: 404 }), origin);
        }

        const forwarded = hList.get("x-forwarded-for");
        const publicIp = forwarded ? forwarded.split(/, /)[0] : "127.0.0.1";

        const { membership, isSuperadmin } = await authorizeTenant(user.id, tenant.id, { publicIp }, hList);

        if (!isSuperadmin && (!membership || membership.role !== 'ADMIN')) {
            return withCors(NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 }), origin);
        }

        // 3. Perform update directly via Prisma (avoids NestJS auth round-trip)
        const body = await request.json();
        const updateData: {
            name?: string;
            logoUrl?: string;
            menuEnabled?: boolean;
            feedbackEnabled?: boolean;
            staffEnabled?: boolean;
            menuUrl?: string;
        } = {};

        if (body.name) updateData.name = body.name;
        if (body.logoUrl !== undefined) updateData.logoUrl = body.logoUrl;
        if (body.menuEnabled !== undefined) updateData.menuEnabled = body.menuEnabled;
        if (body.feedbackEnabled !== undefined) updateData.feedbackEnabled = body.feedbackEnabled;
        if (body.staffEnabled !== undefined) updateData.staffEnabled = body.staffEnabled;
        if (body.menuUrl !== undefined) updateData.menuUrl = body.menuUrl;

        const updated = await prisma.tenant.update({
            where: { id: tenant.id },
            data: updateData,
        });

        const res = NextResponse.json(updated);
        return withCors(res, origin);

    } catch (error) {
        console.error('[Next.js Proxy] POST Error:', error);
        return withCors(NextResponse.json(
            { error: 'Failed to update tenant' },
            { status: 500 }
        ), origin);
    }
}

function withCors(res: NextResponse, origin: string | null) {
    const corsHeaders = getCorsHeaders(origin);
    Object.entries(corsHeaders).forEach(([key, value]) => {
        res.headers.set(key, value);
    });
    return res;
}
