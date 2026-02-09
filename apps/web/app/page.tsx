'use client';

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { clientResolveTenant } from "@/services/apiService";
import { Capacitor } from "@capacitor/core";
import { checkAndRequestLocationPermissions, getConnectedWifiInfo } from "@/lib/wifi";
import TenantChatClient from "@/app/[...slug]/TenantChatClient";
import { DiscoveryScreen } from "@/components/DiscoveryScreen";

type InitState = 'loading' | 'permission_denied' | 'wifi_disconnected' | 'tenant_not_found' | 'error';

function HomeContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [state, setState] = useState<InitState>('loading');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [resolvedSlug, setResolvedSlug] = useState<string | null>(null);

    useEffect(() => {
        async function init() {
            try {
                const startTime = Date.now();
                const isNative = Capacitor.isNativePlatform();

                const nasId = searchParams.get('nas_id') || undefined;
                let bssid: string | undefined = undefined;

                // Native app: attempt to get BSSID, but don't block if failed
                if (isNative) {
                    try {
                        const wifiCheckPromise = async () => {
                            const hasPermission = await checkAndRequestLocationPermissions();
                            if (hasPermission) {
                                const wifiInfo = await getConnectedWifiInfo();
                                if (wifiInfo.isConnected && wifiInfo.bssid) {
                                    bssid = wifiInfo.bssid;
                                }
                            }
                        };

                        const timeoutPromise = new Promise((_, reject) =>
                            setTimeout(() => reject(new Error("Timeout")), 1500)
                        );

                        await Promise.race([wifiCheckPromise(), timeoutPromise]);

                    } catch (e) {
                        console.warn("WiFi detection skipped or failed:", e);
                    }
                }

                // Resolve tenant
                const tenantSlug = await clientResolveTenant(nasId, bssid);

                // Artificial delay to show the "Discovery" animation (min 2 seconds total)
                const elapsed = Date.now() - startTime;
                if (elapsed < 2000) {
                    await new Promise(resolve => setTimeout(resolve, 2000 - elapsed));
                }

                if (tenantSlug) {
                    if (isNative) {
                        // On native, render TenantChatClient directly to avoid routing loop
                        setResolvedSlug(tenantSlug);
                    } else {
                        // On web, use normal Next.js routing
                        router.replace(`/${tenantSlug}`);
                    }
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

    // If tenant is resolved on native, render TenantChatClient directly
    if (resolvedSlug) {
        return <TenantChatClient overrideSlug={resolvedSlug} />;
    }

    // Loading state
    if (state === 'loading') {
        return <DiscoveryScreen />;
    }

    // Error states
    return (
        <div className="h-screen w-full flex flex-col bg-white overflow-y-auto">
            {/* Header Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 pt-12 pb-8">
                <div className="w-20 h-20 mb-8 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm ring-4 ring-white">
                    <img src="/local_logo.svg" alt="Local Logo" className="w-full h-full object-contain p-4" />
                </div>

                <h1 className="text-3xl font-extrabold text-gray-900 mb-3 text-center">
                    Sei quasi dei nostri!
                </h1>
                <p className="text-gray-500 text-center max-w-[280px] mb-10 font-medium leading-relaxed">
                    Per entrare nella chat, devi trovarti in uno dei nostri spazi partner.
                </p>

                {/* Instruction Card */}
                <div className="w-full max-w-sm bg-gray-50 rounded-3xl p-6 border border-gray-100 shadow-sm mb-8">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                                <path d="M8.59 16.11a6 6 0 0 1 6.82 0" />
                                <line x1="12" y1="20" x2="12.01" y2="20" />
                            </svg>
                        </div>
                        <div className="flex flex-col gap-4 text-[0.95rem] text-gray-700 leading-snug">
                            <div className="flex gap-3">
                                <span className="font-bold text-primary shrink-0">1.</span>
                                <span>Assicurati che il Wi-Fi del tuo dispositivo sia attivo.</span>
                            </div>
                            <div className="flex gap-3">
                                <span className="font-bold text-primary shrink-0">2.</span>
                                <span>Cerca e connettiti alla rete: <span className="font-bold text-gray-900">"Local - [Nome del locale]"</span>.</span>
                            </div>
                            <div className="flex gap-3">
                                <span className="font-bold text-primary shrink-0">3.</span>
                                <span>Una volta connesso clicca su "riprova" se non entri in automatico!</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => window.location.reload()}
                        className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg active:scale-[0.98]"
                    >
                        Riprova
                    </button>
                </div>
            </div>

            {/* Branded Footer Card */}
            <div className="p-4 safe-bottom">
                <div className="relative h-32 w-full rounded-3xl overflow-hidden shadow-md group border border-gray-100">
                    {/* Map Background */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: 'url("/map_footer.png")' }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[0.65rem] text-gray-400 uppercase tracking-[0.2em] font-bold mb-0.5">
                            Localy di
                        </span>
                        <span className="text-xl font-black text-gray-900 tracking-tight">
                            Local
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <Suspense fallback={<DiscoveryScreen />}>
            <HomeContent />
        </Suspense>
    );
}
