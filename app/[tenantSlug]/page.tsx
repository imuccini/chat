import TenantChatClient from "./TenantChatClient";
import { prisma } from "@/lib/db";

export default function TenantChatPage() {
    return <TenantChatClient />;
}

// Dynamic fallback: allows routes not pre-rendered to be generated at runtime
export const dynamicParams = true;

// Generate static pages for all tenants in the database at build time
export async function generateStaticParams() {
    try {
        const tenants = await prisma.tenant.findMany({
            select: { slug: true }
        });

        // Always include these as fallback in case DB is empty
        const fallbackSlugs = ['treno-lucca-aulla', 'pisa-centrale', 'demo'];
        const dbSlugs = tenants.map(t => t.slug);
        const allSlugs = [...new Set([...dbSlugs, ...fallbackSlugs])];

        return allSlugs.map(slug => ({ tenantSlug: slug }));
    } catch (error) {
        console.error('Error fetching tenants for static generation:', error);
        // Fallback to hardcoded list if DB is unavailable
        return [
            { tenantSlug: 'treno-lucca-aulla' },
            { tenantSlug: 'pisa-centrale' },
            { tenantSlug: 'demo' }
        ];
    }
}
