'use client';

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { clientResolveTenant } from "@/services/apiService";
import { Capacitor } from "@capacitor/core";
import { checkAndRequestLocationPermissions, getConnectedWifiInfo } from "@/lib/wifi";
import { API_BASE_URL } from "@/config";

type InitState = 'loading' | 'permission_denied' | 'wifi_disconnected' | 'tenant_not_found' | 'error';

function HomeContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [state, setState] = useState<InitState>('loading');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        async function init() {
            try {
                const isNative = Capacitor.isNativePlatform();

                const nasId = searchParams.get('nas_id') || undefined;
                let bssid: string | undefined = undefined;

                // Native app: attempt to get BSSID, but don't block if failed
                if (isNative) {
                    try {
                        // Timeout promise to prevent hanging
                        const wifiCheckPromise = async () => {
                            const hasPermission = await checkAndRequestLocationPermissions();
                            if (hasPermission) {
                                const wifiInfo = await getConnectedWifiInfo();
                                if (wifiInfo.isConnected && wifiInfo.bssid) {
                                    bssid = wifiInfo.bssid;
                                }
                            }
                        };

                        // Race against a 1.5s timeout (fast fallback)
                        const timeoutPromise = new Promise((_, reject) =>
                            setTimeout(() => reject(new Error("Timeout")), 1500)
                        );

                        await Promise.race([wifiCheckPromise(), timeoutPromise]);

                    } catch (e) {
                        console.warn("WiFi detection skipped or failed:", e);
                        // Continue usage to rely on IP address resolution
                    }
                }

                // 3. Resolve tenant (tries BSSID → NAS ID → IP)
                const tenantSlug = await clientResolveTenant(nasId, bssid);

                if (tenantSlug) {
                    router.replace(`/${tenantSlug}`);
                } else {
                    setState('tenant_not_found');
                }
            } catch (err: any) {
                console.error("Failed to resolve tenant", err);
                setErrorMessage("Errore durante l'identificazione dello spazio chat.");
                setState('error');
            }
        }
        init();
    }, [router, searchParams]);

    // Loading state
    if (state === 'loading') {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50 p-4">
                <div className="w-24 h-24 mb-6 flex items-center justify-center">
                    <img src="/local_logo.svg" alt="Local Logo" className="w-full h-full object-contain animate-pulse" />
                </div>
                <div className="text-gray-400 font-medium">Inizializzazione in corso...</div>

                <footer className="absolute bottom-6 w-full text-center">
                    <p className="text-gray-400 text-xs font-medium">
                        Powered by Local - Copyright 2025
                    </p>
                </footer>
            </div>
        );
    }

    // Error states
    const errorConfig = {
        permission_denied: {
            title: "Permessi Richiesti",
            message: "Per identificare la tua posizione, l'app ha bisogno del permesso di localizzazione.",
            hint: "Vai nelle Impostazioni del telefono e abilita i permessi di localizzazione per TrenoChat."
        },
        wifi_disconnected: {
            title: "WiFi Non Connesso",
            message: "Devi essere connesso alla rete WiFi del locale per accedere alla chat.",
            hint: "Connettiti al WiFi del treno o del locale e riprova."
        },
        tenant_not_found: {
            title: "Accesso Negato",
            message: "Impossibile identificare lo spazio chat.",
            hint: "Assicurati di essere connesso al WiFi corretto (es. Treno WiFi)."
        },
        error: {
            title: "Errore",
            message: errorMessage || "Si è verificato un errore imprevisto.",
            hint: "Riprova più tardi."
        }
    };

    const config = errorConfig[state];

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-100 p-4">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
                <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                    <img src="/local_logo.svg" alt="Local Logo" className="w-full h-full object-contain" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{config.title}</h1>
                <p className="text-gray-600 mb-2">{config.message}</p>
                <p className="text-gray-400 text-sm">{config.hint}</p>

                <button
                    onClick={() => window.location.reload()}
                    className="mt-6 px-6 py-2.5 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition-colors"
                >
                    Riprova
                </button>
            </div>

            <footer className="absolute bottom-6 w-full text-center">
                <p className="text-gray-400 text-xs font-medium">
                    Powered by Local - Copyright 2025
                </p>
            </footer>
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
