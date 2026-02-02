import { redirect } from "next/navigation";
import { resolveTenant } from "@/services/tenantResolver";

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Home(props: PageProps) {
    // Await searchParams in Next.js 15+ (if applicable, but safer to await)
    const sp = await props.searchParams;
    const nasId = typeof sp.nas_id === 'string' ? sp.nas_id : undefined;

    // Resolve Tenant via URL (nas_id) or IP
    const tenantSlug = await resolveTenant(nasId);

    if (tenantSlug) {
        // Valid Tenant found -> Redirect to Chat Interface
        redirect(`/${tenantSlug}`);
    }

    // Fallback: No Tenant Identified
    return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-100 p-4">
            <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
                <h1 className="text-2xl font-bold text-red-500 mb-4">Accesso Negato</h1>
                <p className="text-gray-700">Impossibile identificare lo spazio chat.</p>
                <p className="text-gray-500 text-sm mt-2">Assicurati di essere connesso al Wi-Fi corretto (es. Treno WiFi).</p>
                <div className="text-xs text-gray-400 mt-4 bg-gray-50 p-2 rounded">
                    Debug Info: {nasId ? `NAS-ID: ${nasId}` : 'Nessun identificativo trovato (No NAS-ID, No Recognizable IP)'}
                </div>
            </div>
        </div>
    );
}
