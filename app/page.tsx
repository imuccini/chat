import { redirect } from "next/navigation";
import { resolveTenant } from "@/services/tenantResolver";
import { headers } from "next/headers";

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Home(props: PageProps) {
    // Await searchParams in Next.js 15+
    const sp = await props.searchParams;
    const nasId = typeof sp.nas_id === 'string' ? sp.nas_id : undefined;

    // Resolve Tenant via URL (nas_id) or IP
    const tenantSlug = await resolveTenant(nasId);

    if (tenantSlug) {
        // Valid Tenant found -> Redirect to Chat Interface
        redirect(`/${tenantSlug}`);
    }

    // For debugging: Get IP explicitly to show users
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const remoteIp = forwardedFor ? forwardedFor.split(',')[0].trim() : "Direct/Unknown";

    // Fallback: No Tenant Identified
    console.log('[TenantResolver] Failed to resolve tenant.', { nasId, remoteIp });

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-100 p-4">
            <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
                <h1 className="text-2xl font-bold text-red-500 mb-4">Accesso Negato</h1>
                <p className="text-gray-700">Impossibile identificare lo spazio chat.</p>
                <p className="text-gray-500 text-sm mt-2">Assicurati di essere connesso al Wi-Fi corretto (es. Treno WiFi).</p>
            </div>
        </div>
    );
}
