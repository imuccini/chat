'use client';

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { clientResolveTenant } from "@/services/apiService";

function HomeContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function init() {
            try {
                const nasId = searchParams.get('nas_id') || undefined;
                const tenantSlug = await clientResolveTenant(nasId);

                if (tenantSlug) {
                    router.replace(`/${tenantSlug}`);
                } else {
                    setLoading(false);
                }
            } catch (err) {
                console.error("Failed to resolve tenant", err);
                setError("Errore durante l'identificazione dello spazio chat.");
                setLoading(false);
            }
        }
        init();
    }, [router, searchParams]);

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-gray-50">
                <div className="animate-pulse text-gray-400 font-medium">Inizializzazione in corso...</div>
            </div>
        );
    }

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-100 p-4">
            <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
                <h1 className="text-2xl font-bold text-red-500 mb-4">{error ? "Errore" : "Accesso Negato"}</h1>
                <p className="text-gray-700">{error || "Impossibile identificare lo spazio chat."}</p>
                <p className="text-gray-500 text-sm mt-2">Assicurati di essere connesso al Wi-Fi corretto (es. Treno WiFi).</p>
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <Suspense fallback={
            <div className="h-screen w-full flex items-center justify-center bg-gray-50">
                <div className="animate-pulse text-gray-400 font-medium">Inizializzazione in corso...</div>
            </div>
        }>
            <HomeContent />
        </Suspense>
    );
}
