import { NextRequest, NextResponse } from 'next/server';
import { getCorsHeaders, handleOptions } from '@/lib/cors';

export async function OPTIONS(req: Request) {
    return handleOptions(req);
}

/**
 * Resolve the user ID from session cookies or a userId fallback in the body.
 * Anonymous users may not have a BetterAuth session cookie, so we accept
 * userId from the request body and verify the user exists in the database.
 */
async function resolveUser(hList: Headers, userId?: string) {
    const { resolveSession } = await import('@/lib/session');

    // 1. Try BetterAuth session (cookie-based)
    const resolved = await resolveSession(hList);
    if (resolved?.user) return resolved.user;

    // 2. Fallback: verify userId from request body exists in DB
    if (userId) {
        const { prisma } = await import('@/lib/db');
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (user) return user;
    }

    return null;
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const origin = request.headers.get('origin');

    try {
        const { headers } = await import('next/headers');
        const { prisma } = await import('@/lib/db');

        const hList = await headers();
        const body = await request.json();
        const { score, comment, userId } = body;

        const user = await resolveUser(hList, userId);
        if (!user) {
            return withCors(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }), origin);
        }

        const tenant = await prisma.tenant.findUnique({ where: { slug } });
        if (!tenant) {
            return withCors(NextResponse.json({ error: 'Tenant not found' }, { status: 404 }), origin);
        }

        if (typeof score !== 'number' || score < 1 || score > 10) {
            return withCors(NextResponse.json({ error: 'Invalid score' }, { status: 400 }), origin);
        }

        const feedback = await (prisma as any).feedback.create({
            data: {
                userId: user.id,
                tenantId: tenant.id,
                score,
                comment: comment || null,
            },
            include: { user: true },
        });

        return withCors(NextResponse.json(feedback), origin);
    } catch (error) {
        console.error('[Feedback Proxy] POST Error:', error);
        return withCors(NextResponse.json(
            { error: 'Failed to submit feedback' },
            { status: 500 }
        ), origin);
    }
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const origin = request.headers.get('origin');

    try {
        const { headers } = await import('next/headers');
        const { prisma } = await import('@/lib/db');

        const hList = await headers();
        const userIdParam = request.nextUrl.searchParams.get('userId');

        const user = await resolveUser(hList, userIdParam || undefined);
        if (!user) {
            return withCors(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }), origin);
        }

        const tenant = await prisma.tenant.findUnique({ where: { slug } });
        if (!tenant) {
            return withCors(NextResponse.json({ error: 'Tenant not found' }, { status: 404 }), origin);
        }

        const feedbacks = await (prisma as any).feedback.findMany({
            where: { tenantId: tenant.id },
            include: { user: true },
            orderBy: { createdAt: 'desc' },
        });

        return withCors(NextResponse.json(feedbacks), origin);
    } catch (error) {
        console.error('[Feedback Proxy] GET Error:', error);
        return withCors(NextResponse.json(
            { error: 'Failed to fetch feedback' },
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
