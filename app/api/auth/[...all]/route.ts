import { getAuth } from "@/lib/auth";

const getOrigin = (req: Request) => {
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
