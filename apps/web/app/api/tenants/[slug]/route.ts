import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    // Always use localhost for server-side API calls
    const apiUrl = 'http://localhost:3001';
    const fullUrl = `${apiUrl}/api/tenants/${slug}`;

    console.log(`[Next.js Proxy] GET /api/tenants/${slug} -> ${fullUrl}`);

    try {
        const response = await fetch(fullUrl, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        console.log(`[Next.js Proxy] Response: ${response.status}`, JSON.stringify(data).substring(0, 100));

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('[Next.js Proxy] Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch tenant' },
            { status: 500 }
        );
    }
}
