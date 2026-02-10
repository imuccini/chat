import { getAuth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getCorsHeaders, handleOptions } from "@/lib/cors";

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

// Handle CORS preflight requests
export const OPTIONS = async (req: Request) => {
    return handleOptions(req);
};

export const GET = async (req: Request) => {
    const origin = getOrigin(req);
    const requestOrigin = req.headers.get('origin');
    const auth = getAuth(origin);
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
    const response = await auth.handler(req);

    // Add CORS headers to the response
    const corsHeaders = getCorsHeaders(requestOrigin);
    Object.entries(corsHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
    });

    return response;
};
