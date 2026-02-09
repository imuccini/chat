'use client';

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { clientResolveTenant } from "@/services/apiService";
import { Capacitor } from "@capacitor/core";
import { CapacitorWifi } from '@capgo/capacitor-wifi';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { checkAndRequestLocationPermissions, getConnectedWifiInfo } from "@/lib/wifi";
import TenantChatClient from "@/app/[...slug]/TenantChatClient";
import { DiscoveryScreen } from "@/components/DiscoveryScreen";
import { SearchSpacesScreen } from "@/components/SearchSpacesScreen";
import { AutoConnectScreen } from "@/components/AutoConnectScreen";
import { Wifi, MapPin, ChevronRight, BellRing, Sparkles } from "lucide-react";

type InitState = 'loading' | 'permission_denied' | 'wifi_disconnected' | 'tenant_not_found' | 'error';

function HomeContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [state, setState] = useState<InitState>('loading');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [resolvedSlug, setResolvedSlug] = useState<string | null>(null);
    const [showMap, setShowMap] = useState(false);
    const [showAutoConnect, setShowAutoConnect] = useState(false);

    // Shared helper for tenant resolution
    const resolveCurrentTenant = async (nasId?: string) => {
        const isNative = Capacitor.isNativePlatform();
        let bssid: string | undefined = undefined;

        if (isNative) {
            try {
                // Passive attempt: attempt connection but with short timeout
                await Promise.race([
                    CapacitorWifi.connect({
                        ssid: "Local - WiFi",
                        password: "localwifisicuro",
                    }),
                    new Promise((_, reject) => setTimeout(() => reject('timeout'), 2000))
                ]).catch(() => { });

                // Get BSSID
                const hasPermission = await checkAndRequestLocationPermissions();
                if (hasPermission) {
                    const wifiInfo = await getConnectedWifiInfo();
                    if (wifiInfo.isConnected && wifiInfo.bssid) {
                        bssid = wifiInfo.bssid;
                    }
                }
            } catch (e) {
                console.warn("[page] Native resolution step failed:", e);
            }
        }

        // Resolve tenant via API
        return await clientResolveTenant(nasId, bssid);
    };

    // Initial Discovery Phase
    useEffect(() => {
        let isCancelled = false;

        async function init() {
            try {
                const startTime = Date.now();
                const nasId = searchParams.get('nas_id') || undefined;

                // 1. Definition of the polling/initialization logic
                const performPolling = async (): Promise<string | null> => {
                    const pollInterval = 2000;
                    const maxDuration = 10000;

                    while (Date.now() - startTime < maxDuration && !isCancelled) {
                        const slug = await resolveCurrentTenant(nasId);
                        if (slug) return slug;

                        // Wait for next poll
                        await new Promise(resolve => setTimeout(resolve, pollInterval));
                    }
                    return null;
                };

                // 2. Guaranteed hard safety timeout (10.5 seconds to be safe)
                const safetyTimeout = new Promise<null>((resolve) =>
                    setTimeout(() => {
                        console.warn("[page] Safety timeout reached. Breaking out.");
                        resolve(null);
                    }, 10500)
                );

                // Race for the result
                const slug = await Promise.race([performPolling(), safetyTimeout]);

                if (isCancelled) return;

                if (slug) {
                    // Artificial delay to show the "Discovery" animation (min 2 seconds total)
                    const elapsed = Date.now() - startTime;
                    if (elapsed < 2000) {
                        await new Promise(resolve => setTimeout(resolve, 2000 - elapsed));
                    }

                    if (Capacitor.isNativePlatform()) {
                        setResolvedSlug(slug);
                    } else {
                        router.replace(`/${slug}`);
                    }
                } else {
                    setState('tenant_not_found');
                }
            } catch (err: any) {
                console.error("Failed to resolve tenant", err);
                setState('tenant_not_found');
            }
        }

        init();
        return () => { isCancelled = true; };
    }, [router, searchParams]);

    // Background Polling (Instructions Screen)
    useEffect(() => {
        if (state !== 'tenant_not_found' || resolvedSlug) return;

        let isCancelled = false;
        const nasId = searchParams.get('nas_id') || undefined;

        console.log("[page] Starting background polling for tenant resolution...");

        const poll = async () => {
            if (isCancelled) return;

            const slug = await resolveCurrentTenant(nasId);
            if (slug && !isCancelled) {
                console.log("[page] Background resolution success:", slug);
                if (Capacitor.isNativePlatform()) {
                    setResolvedSlug(slug);
                } else {
                    router.replace(`/${slug}`);
                }
            } else {
                // Poll again in 5 seconds
                setTimeout(poll, 5000);
            }
        };

        poll();
        return () => { isCancelled = true; };
    }, [state, resolvedSlug, searchParams, router]);

    // If tenant is resolved on native, render TenantChatClient directly
    if (resolvedSlug) {
        return <TenantChatClient overrideSlug={resolvedSlug} />;
    }

    // Loading state
    if (state === 'loading') {
        return <DiscoveryScreen />;
    }

    if (showMap) {
        return <SearchSpacesScreen onBack={() => setShowMap(false)} />;
    }

    if (showAutoConnect) {
        return <AutoConnectScreen onBack={() => setShowAutoConnect(false)} />;
    }

    // Error states (Instruction Screen)
    return (
        <div className="h-screen w-full flex flex-col bg-white overflow-hidden">
            {/* Header Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-24 h-24 mb-6 rounded-3xl overflow-hidden flex items-center justify-center bg-white shadow-sm ring-1 ring-gray-100">
                    <img src="/local_logo.svg" alt="Local Logo" className="w-full h-full object-contain p-4" />
                </div>

                <h1 className="text-3xl font-black text-gray-900 mb-2">
                    Sei quasi dei nostri!
                </h1>
                <p className="text-gray-500 font-medium max-w-[280px] mb-12">
                    Per entrare in Local devi trovarti in uno degli spazi aderenti.
                </p>

                {/* Instruction Card */}
                <div className="w-full max-w-sm px-4">
                    <div className="flex flex-col items-center gap-4 py-8 px-6 bg-gray-50 rounded-[40px] border border-gray-100/50">
                        <button
                            onClick={() => {
                                Haptics.impact({ style: ImpactStyle.Medium });
                                resolveCurrentTenant(searchParams.get('nas_id') || undefined).then(slug => {
                                    if (slug) {
                                        if (Capacitor.isNativePlatform()) {
                                            setResolvedSlug(slug);
                                        } else {
                                            router.replace(`/${slug}`);
                                        }
                                    }
                                });
                            }}
                            className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors active:scale-95 shadow-sm"
                        >
                            <Wifi className="w-8 h-8 text-primary" strokeWidth={2.5} />
                        </button>
                        <p className="text-gray-900 font-bold leading-snug">
                            Cerca e connettiti ad una rete WiFi <span className="text-primary">"Local - WiFi"</span>
                        </p>

                        <div className="pt-2">
                            <button
                                onClick={() => setShowAutoConnect(true)}
                                className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-md active:scale-95"
                            >
                                <Sparkles className="w-4 h-4" />
                                Connettimi in automatico
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Branded Footer Banner */}
            <div className="p-6 pt-2 safe-bottom">
                <button
                    onClick={() => setShowMap(true)}
                    className="w-full h-24 bg-gray-900 rounded-[32px] p-4 flex items-center gap-4 relative overflow-hidden group active:scale-[0.98] transition-transform"
                >
                    {/* Abstract background hints */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -mr-16 -mt-16" />

                    <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/10">
                        <MapPin className="w-7 h-7 text-white" />
                    </div>

                    <div className="flex-1 text-left">
                        <h3 className="text-white font-bold text-lg">Scopri le location</h3>
                        <p className="text-white/50 text-sm font-medium">Trova tutti gli spazi Local</p>
                    </div>

                    <ChevronRight className="w-6 h-6 text-white/30 group-hover:text-white/60 transition-colors mr-2" />
                </button>
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
