import TenantChatClient from "./TenantChatClient";
import { prisma } from "@/lib/db";

export default function CatchAllPage() {
    return <TenantChatClient />;
}

// Generate static pages for all existing tenants
// New tenants added after build will still work because:
// 1. The catch-all route matches any path
// 2. TenantChatClient resolves the tenant client-side via API
export async function generateStaticParams() {
    try {
        const tenants = await prisma.tenant.findMany({
            select: { slug: true }
        });

        // Return all tenant slugs as static paths
        return tenants.map(t => ({ slug: [t.slug] }));
    } catch (error) {
        console.error('Error fetching tenants for static generation:', error);
        // Return empty array - pages will be generated on-demand
        return [];
    }
}
