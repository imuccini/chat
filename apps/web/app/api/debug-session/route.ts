import { getAuth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const hList = await headers();
        const origin = hList.get('origin') || hList.get('host') || "";
        const auth = getAuth(origin);

        const session = await auth.api.getSession({
            headers: hList
        });

        return NextResponse.json(session || { session: null, user: null });
    } catch (e: any) {
        console.error("[Debug Session] Error:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
