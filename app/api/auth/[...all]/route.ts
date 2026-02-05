import { getAuth } from "@/lib/auth";

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

export const GET = async (req: Request) => {
    const origin = getOrigin(req);
    const auth = getAuth(origin);
    console.log(`[Auth API] GET ${req.url} | Origin: ${origin}`);
    return await auth.handler(req);
};

export const POST = async (req: Request) => {
    const origin = getOrigin(req);
    const auth = getAuth(origin);
    console.log(`[Auth API] POST ${req.url} | Origin: ${origin}`);
    return await auth.handler(req);
};
