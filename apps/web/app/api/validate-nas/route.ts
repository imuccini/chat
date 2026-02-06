import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { nas_id, bssid } = body;

        // Pass mapping to NestJS API
        const apiUrl = 'http://localhost:3001';
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

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        // Return format expected by apiService.ts: { valid: boolean, tenantSlug: string }
        return NextResponse.json({
            valid: data.valid,
            tenantSlug: data.tenant?.slug || null
        });
    } catch (error: any) {
        console.error('[Next.js Proxy] Error in validate-nas:', error);
        return NextResponse.json(
            { error: 'Failed to validate NAS', details: error.message },
            { status: 500 }
        );
    }
}

// Support GET for older versions or simple checks
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const nas_id = searchParams.get('nas_id');
    const bssid = searchParams.get('bssid');

    const apiUrl = 'http://localhost:3001';
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
        if (!response.ok) return NextResponse.json(data, { status: response.status });

        return NextResponse.json({
            valid: data.valid,
            tenantSlug: data.tenant?.slug || null
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
