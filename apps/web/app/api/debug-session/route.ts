import { getAuth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS(req: NextRequest) {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': req.headers.get('origin') || '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, Cookie',
            'Access-Control-Allow-Credentials': 'true',
        },
    });
}

export async function GET(req: NextRequest) {
    try {
        const hList = await headers();
        const origin = hList.get('origin') || hList.get('host') || "";
        const auth = getAuth(origin);

        const session = await auth.api.getSession({
            headers: hList
        });

        const response = NextResponse.json(session || { session: null, user: null });

        // Add CORS headers to response
        const reqOrigin = req.headers.get('origin');
        if (reqOrigin) {
            response.headers.set('Access-Control-Allow-Origin', reqOrigin);
            response.headers.set('Access-Control-Allow-Credentials', 'true');
        }

        return response;
    } catch (e: any) {
        console.error("[Debug Session] Error:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
