import { getTenantByNasId } from "@/services/messageService";
import { redirect } from "next/navigation";

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Home(props: PageProps) {
    const searchParams = await props.searchParams;
    const nasId = searchParams.nas_id;

    if (typeof nasId === 'string') {
        const tenant = await getTenantByNasId(nasId);

        if (tenant) {
            redirect(`/${tenant.slug}`);
        } else {
            return (
                <div className="h-screen w-full flex items-center justify-center bg-gray-100 p-4">
                    <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
                        <h1 className="text-2xl font-bold text-red-500 mb-4">Accesso Negato</h1>
                        <p className="text-gray-700">La chat in questo spazio non e' attiva.</p>
                        <p className="text-xs text-gray-400 mt-4">ID Router non riconosciuto: {nasId}</p>
                    </div>
                </div>
            );
        }
    }

    // Fallback for direct access without NAS ID (Demo/Test)
    // In production you might want to block this too, or show a tenant selector
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold mb-8">Benvenuto su Treno Chat</h1>
            <p className="mb-4">Per accedere, connettiti al Wi-Fi del treno.</p>
        </main>
    );
}
