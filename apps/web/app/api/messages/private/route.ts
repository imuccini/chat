import { NextRequest, NextResponse } from 'next/server';
import { getCorsHeaders, handleOptions } from '@/lib/cors';

export async function OPTIONS(req: Request) {
    return handleOptions(req);
}

export async function GET(request: NextRequest) {
    const origin = request.headers.get('origin');
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();

    const apiUrl = 'http://localhost:3001';
    const fullUrl = `${apiUrl}/api/messages/private${queryString ? `?${queryString}` : ''}`;

    try {
        const response = await fetch(fullUrl, {
            headers: {
                'Content-Type': 'application/json',
                ...(request.headers.get('authorization') ? { 'authorization': request.headers.get('authorization')! } : {}),
            },
        });

        const text = await response.text();

        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            data = { error: 'Invalid JSON response from backend', details: text };
        }

        const res = NextResponse.json(data, { status: response.ok ? 200 : response.status });
        return withCors(res, origin);
    } catch (error: any) {
        console.error('[Next.js Proxy] Error fetching private messages:', error);
        return withCors(NextResponse.json(
            { error: 'Failed to fetch private messages', details: error.message },
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
