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
        // 1. Authorize User
        // We import dynamically to avoid issues with edge runtime if used, though this is node runtime
        const { authorizeTenant, isGlobalAdmin } = await import('@/lib/authorize');
        const { getAuthFromHeaders } = await import('@/lib/auth');
        const { headers } = await import('next/headers');

        const hList = await headers();
        const dynamicAuth = await getAuthFromHeaders(hList);
        const session = await dynamicAuth.api.getSession({ headers: hList });
        const user = session?.user;

        if (!user) {
            return withCors(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }), origin);
        }

        // Get tenant ID from slug (we might need to fetch it first or trust if passed in body, 
        // but authorizeTenant takes ID. Let's fetch tenant by slug first using prisma directly strictly for Auth check)
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

        // 2. Forward Request to Backend
        // Always use localhost for server-side API calls
        const apiUrl = 'http://localhost:3001';
        const fullUrl = `${apiUrl}/api/tenants/${slug}`;

        const body = await request.json();

        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...body, id: tenant.id }), // Ensure ID is passed
        });

        const data = await response.json();
        const res = NextResponse.json(data, { status: response.ok ? 200 : response.status });
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
