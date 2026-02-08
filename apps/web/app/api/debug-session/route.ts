import { getAuth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getCorsHeaders, handleOptions } from "@/lib/cors";

export async function OPTIONS(req: Request) {
    return handleOptions(req);
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
        const corsHeaders = getCorsHeaders(reqOrigin);
        Object.entries(corsHeaders).forEach(([key, value]) => {
            response.headers.set(key, value);
        });

        return response;
    } catch (e: any) {
        console.error("[Debug Session] Error:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
