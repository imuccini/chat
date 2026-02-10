import { NextRequest, NextResponse } from 'next/server';
import { getCorsHeaders, handleOptions } from '@/lib/cors';

// In-memory rate limiter: IP -> last submission timestamp
const feedbackRateLimit = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 30_000; // 30 seconds

function checkRateLimit(ip: string): { limited: boolean; retryAfter?: number } {
    const now = Date.now();
    const lastSubmission = feedbackRateLimit.get(ip);
    if (lastSubmission && now - lastSubmission < RATE_LIMIT_WINDOW_MS) {
        return { limited: true, retryAfter: Math.ceil((RATE_LIMIT_WINDOW_MS - (now - lastSubmission)) / 1000) };
    }
    feedbackRateLimit.set(ip, now);
    // Cleanup old entries periodically (keep map from growing unbounded)
    if (feedbackRateLimit.size > 10_000) {
        for (const [key, ts] of feedbackRateLimit) {
            if (now - ts > RATE_LIMIT_WINDOW_MS) feedbackRateLimit.delete(key);
        }
    }
    return { limited: false };
}

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
    // Also verify the user has an active connection (exists in user table)
    // This fallback exists because anonymous users may not have a BetterAuth session cookie.
    // It can be removed once anonymous sign-in reliably sets the session cookie (see Fix 6).
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

    // Rate limit: 1 feedback per 30 seconds per IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
    const rateCheck = checkRateLimit(ip);
    if (rateCheck.limited) {
        return withCors(
            NextResponse.json({ error: 'Too many requests', retryAfter: rateCheck.retryAfter }, { status: 429 }),
            origin
        );
    }

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
