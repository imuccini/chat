import { NextResponse } from 'next/server';

const getServerOrigins = () => {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    if (!serverUrl) return [];

    // Add both the 3000 (web) and 3001 (api) versions of the server URL
    const origins = [serverUrl];
    if (serverUrl.includes(':3000')) {
        origins.push(serverUrl.replace(':3000', ':3001'));
    } else if (!serverUrl.includes(':')) {
        // If no port specified, assume standard ones for local dev if they aren't localhost
        origins.push(`${serverUrl}:3000`);
        origins.push(`${serverUrl}:3001`);
    }
    return origins;
};

export const ALLOWED_ORIGINS = [
    "capacitor://localhost",
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3001",
    ...getServerOrigins(),
];

export const getCorsHeaders = (requestOrigin: string | null) => {
    // Normalize origin for comparison (remove trailing slash)
    const normalizedOrigin = requestOrigin?.replace(/\/$/, "");

    // Check if it's in our allowed list or starts with capacitor://
    const isAllowed = normalizedOrigin && (
        ALLOWED_ORIGINS.map(o => o.replace(/\/$/, "")).includes(normalizedOrigin) ||
        normalizedOrigin.startsWith('capacitor://')
    );

    // In dev, we can be more permissive if needed, but for now we follow the whitelist
    const origin = isAllowed ? requestOrigin! : ALLOWED_ORIGINS[0];

    return {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Cookie, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
        'Access-Control-Allow-Credentials': 'true',
    };
};

export const handleOptions = (req: Request) => {
    return new NextResponse(null, {
        status: 200,
        headers: getCorsHeaders(req.headers.get('origin'))
    });
};

export const withCors = (res: NextResponse, origin: string | null) => {
    const headers = getCorsHeaders(origin);
    Object.entries(headers).forEach(([key, value]) => {
        res.headers.set(key, value);
    });
    return res;
};
