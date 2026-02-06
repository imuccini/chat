import { getAuth } from "@/lib/auth";
import { NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
    "capacitor://localhost",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://192.168.1.111:3000",
    "http://192.168.1.111:3001",
];

const getOrigin = (req: Request) => {
    // 1. Prefer the actual Client "Origin" header if present (e.g., capacitor://localhost or http://localhost:3000 or http://192.168.x.x)
    // This ensures RP ID matches the client context, not the server's IP.
    const originHeader = req.headers.get('origin');
    if (originHeader) return originHeader;

    // 2. Fallback to Host header (Server-side context)
    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = req.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');
    return `${protocol}://${host}`;
};

const getCorsHeaders = (requestOrigin: string | null) => {
    // Allow the requesting origin if it's in our allowed list, or if it's capacitor://
    const origin = requestOrigin && (ALLOWED_ORIGINS.includes(requestOrigin) || requestOrigin.startsWith('capacitor://'))
        ? requestOrigin
        : ALLOWED_ORIGINS[0];

    return {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Cookie, X-Requested-With',
        'Access-Control-Allow-Credentials': 'true',
    };
};

// Handle CORS preflight requests
export const OPTIONS = async (req: Request) => {
    const requestOrigin = req.headers.get('origin');
    console.log(`[Auth API] OPTIONS preflight | Origin: ${requestOrigin}`);

    return new NextResponse(null, {
        status: 200,
        headers: getCorsHeaders(requestOrigin),
    });
};

export const GET = async (req: Request) => {
    const origin = getOrigin(req);
    const requestOrigin = req.headers.get('origin');
    const auth = getAuth(origin);
    console.log(`[Auth API] GET ${req.url} | Origin: ${origin}`);

    const response = await auth.handler(req);

    // Add CORS headers to the response
    const corsHeaders = getCorsHeaders(requestOrigin);
    Object.entries(corsHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
    });

    return response;
};

export const POST = async (req: Request) => {
    const origin = getOrigin(req);
    const requestOrigin = req.headers.get('origin');
    const auth = getAuth(origin);
    console.log(`[Auth API] POST ${req.url} | Origin: ${origin}`);

    const response = await auth.handler(req);

    // Add CORS headers to the response
    const corsHeaders = getCorsHeaders(requestOrigin);
    Object.entries(corsHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
    });

    return response;
};
