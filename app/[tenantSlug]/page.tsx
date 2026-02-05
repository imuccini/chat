import TenantChatClient from "./TenantChatClient";
import { prisma } from "@/lib/db";

export default function TenantChatPage() {
    return <TenantChatClient />;
}

// Dynamic parameters: allows accessing slugs not present at build time
export const dynamicParams = true;

// Generate static pages for all tenants in the database at build time
export async function generateStaticParams() {
    try {
        const tenants = await prisma.tenant.findMany({
            select: { slug: true }
        });

        return tenants.map(t => ({ tenantSlug: t.slug }));
    } catch (error) {
        console.error('Error fetching tenants for static generation:', error);
        return [];
    }
}
