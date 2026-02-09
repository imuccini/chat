import { NextRequest, NextResponse } from 'next/server';
import { getCorsHeaders, handleOptions } from '@/lib/cors';

export async function OPTIONS(req: Request) {
    return handleOptions(req);
}

export async function POST(request: NextRequest) {
    const origin = request.headers.get('origin');
    try {
        const body = await request.json();
        const { nas_id, bssid } = body;

        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
        const apiUrl = serverUrl.replace(':3000', ':3001');
        const fullUrl = `${apiUrl}/api/tenants/validate-nas`;

        console.log(`[Next.js Proxy] POST /api/validate-nas -> ${fullUrl}`, body);

        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nasId: nas_id,
                bssid: bssid,
                publicIp: request.headers.get('x-forwarded-for') || '127.0.0.1'
            }),
        });

        const data = await response.json();
        console.log(`[Next.js Proxy] Response: ${response.status}`, data);

        const res = NextResponse.json(response.ok ? {
            valid: data.valid,
            tenantSlug: data.tenant?.slug || null
        } : data, { status: response.ok ? 200 : response.status });

        return withCors(res, origin);
    } catch (error: any) {
        console.error('[Next.js Proxy] Error in validate-nas:', error);
        return withCors(NextResponse.json(
            { error: 'Failed to validate NAS', details: error.message },
            { status: 500 }
        ), origin);
    }
}

export async function GET(request: NextRequest) {
    const origin = request.headers.get('origin');
    const { searchParams } = new URL(request.url);
    const nas_id = searchParams.get('nas_id');
    const bssid = searchParams.get('bssid');

    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
    const apiUrl = serverUrl.replace(':3000', ':3001');
    const fullUrl = `${apiUrl}/api/tenants/validate-nas`;

    try {
        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nasId: nas_id,
                bssid: bssid,
                publicIp: request.headers.get('x-forwarded-for') || '127.0.0.1'
            }),
        });

        const data = await response.json();
        const res = NextResponse.json(response.ok ? {
            valid: data.valid,
            tenantSlug: data.tenant?.slug || null
        } : data, { status: response.ok ? 200 : response.status });

        return withCors(res, origin);
    } catch (error: any) {
        return withCors(NextResponse.json({ error: error.message }, { status: 500 }), origin);
    }
}

function withCors(res: NextResponse, origin: string | null) {
    const corsHeaders = getCorsHeaders(origin);
    Object.entries(corsHeaders).forEach(([key, value]) => {
        res.headers.set(key, value);
    });
    return res;
}
