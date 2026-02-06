import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();

    // Always use localhost for server-side API calls
    const apiUrl = 'http://localhost:3001';
    const fullUrl = `${apiUrl}/api/messages${queryString ? `?${queryString}` : ''}`;

    console.log(`[Next.js Proxy] GET /api/messages -> ${fullUrl}`);

    try {
        const response = await fetch(fullUrl, {
            headers: {
                'Content-Type': 'application/json',
                // Forward authorization header if present
                ...(request.headers.get('authorization') ? { 'authorization': request.headers.get('authorization')! } : {}),
            },
        });

        const text = await response.text();
        console.log(`[Next.js Proxy] Response: ${response.status}`, text.substring(0, 100));

        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            data = { error: 'Invalid JSON response from backend', details: text };
        }

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('[Next.js Proxy] Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch messages', details: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    // Note: path-based params need to be handled if the URL is /api/messages/:id
    // But since this file is at /api/messages/route.ts, it only matches /api/messages
    // We might need a [id]/route.ts if we want to proxy DELETE /api/messages/:id
    return NextResponse.json({ error: 'Method not implemented in proxy' }, { status: 501 });
}
