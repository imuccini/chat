import { auth } from "@/lib/auth";

export const GET = async (req: Request) => {
    console.log(`[Auth API] GET ${req.url}`);
    return await auth.handler(req);
};

export const POST = async (req: Request) => {
    console.log(`[Auth API] POST ${req.url}`);
    return await auth.handler(req);
};
