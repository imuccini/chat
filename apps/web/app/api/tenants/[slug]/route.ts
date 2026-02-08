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

function withCors(res: NextResponse, origin: string | null) {
    const corsHeaders = getCorsHeaders(origin);
    Object.entries(corsHeaders).forEach(([key, value]) => {
        res.headers.set(key, value);
    });
    return res;
}
