'use client';

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { clientResolveTenant } from "@/services/apiService";
import { Capacitor } from "@capacitor/core";
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { checkAndRequestLocationPermissions, getConnectedWifiInfo } from "@/lib/wifi";
import TenantChatClient from "@/app/[...slug]/TenantChatClient";
import { DiscoveryScreen } from "@/components/DiscoveryScreen";
import { SearchSpacesScreen } from "@/components/SearchSpacesScreen";
import { AutoConnectScreen } from "@/components/AutoConnectScreen";
import { OnboardingScreen } from "@/components/OnboardingScreen";
import { Wifi, MapPin, ChevronRight, BellRing, Sparkles, LocateFixed } from "lucide-react";
import { HowItWorks } from "@/components/HowItWorks";
import { sqliteService } from "@/lib/sqlite";
import { wifiProfileService } from "@/lib/wifiProfileService";

type InitState = 'loading' | 'permission_denied' | 'wifi_disconnected' | 'tenant_not_found' | 'error';

function HomeContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [state, setState] = useState<InitState>('loading');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [resolvedSlug, setResolvedSlug] = useState<string | null>(null);
    const [showMap, setShowMap] = useState(false);
    const [showAutoConnect, setShowAutoConnect] = useState(false);
    const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);
    const [showHowItWorks, setShowHowItWorks] = useState(false);
    const [isPreciseOff, setIsPreciseOff] = useState(false);

    // Track if instructions animations have already played in this session
    const [hasSeenInstructions, setHasSeenInstructions] = useState(false);
    const [hasWifiProfile, setHasWifiProfile] = useState<boolean | null>(null);

    // Shared helper for tenant resolution
    const resolveCurrentTenant = async (nasId?: string) => {
        const isNative = Capacitor.isNativePlatform();
        let bssid: string | undefined = undefined;

        if (isNative) {
            try {
                // 5-second safety timeout for native WiFi detection
                await Promise.race([
                    (async () => {
                        // On iOS, skip @capgo/capacitor-wifi permission check (it hangs).
                        // Location permissions are already obtained during onboarding.
                        // getConnectedWifiInfo() uses the custom WifiInfo plugin which
                        // handles missing permissions gracefully via isPrecise check.
                        const isIOS = Capacitor.getPlatform() === 'ios';
                        if (!isIOS) {
                            const hasPermission = await checkAndRequestLocationPermissions();
                            if (!hasPermission) return;
                        }
                        const wifiInfo = await getConnectedWifiInfo();
                        if (wifiInfo.isPreciseOff) {
                            setIsPreciseOff(true);
                        }
                        if (wifiInfo.isConnected && wifiInfo.bssid) {
                            bssid = wifiInfo.bssid;
                        }
                    })(),
                    new Promise((_, reject) => setTimeout(() => reject('Native logic timeout'), 5000))
                ]);
            } catch (e) {
                console.warn("[page] Native resolution step failed or timed out:", e);
            }
        }

        // Resolve tenant via API (always reached, even if WiFi detection fails/times out)
        return await clientResolveTenant(nasId, bssid);
    };

    // Check onboarding status on mount (before discovery)
    useEffect(() => {
        async function checkOnboarding() {
            // Check if onboarding is already done
            const localDone = localStorage.getItem('onboarding_done');

            if (Capacitor.isNativePlatform()) {
                try {
                    await sqliteService.initialize();
                    const sqliteDone = await sqliteService.getSetting('onboarding_done');
                    if (sqliteDone || localDone) {
                        // Migrate from localStorage to SQLite if needed
                        if (localDone && !sqliteDone) {
                            await sqliteService.setSetting('onboarding_done', 'true');
                        }
                        setShowOnboarding(false);
                    } else {
                        setShowOnboarding(true);
                    }
                } catch {
                    // SQLite failed — fallback to localStorage
                    setShowOnboarding(!localDone);
                }
            } else {
                setShowOnboarding(!localDone);
            }
        }
        checkOnboarding();
    }, []);

    // Discovery Phase — only runs AFTER onboarding is complete
    useEffect(() => {
        // Wait for onboarding check to finish, and don't start if onboarding is showing
        if (showOnboarding === null || showOnboarding === true) return;

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
    }, [showOnboarding, router, searchParams]);

    // Background Resolution (Instructions Screen)
    // Uses significant location monitoring on iOS + fallback polling
    useEffect(() => {
        if (state !== 'tenant_not_found' || resolvedSlug) return;

        let isCancelled = false;
        let listenerHandle: any = null;
        const nasId = searchParams.get('nas_id') || undefined;

        console.log("[page] Starting background resolution for tenant...");

        const attemptResolve = async () => {
            if (isCancelled) return;

            const slug = await resolveCurrentTenant(nasId);
            if (slug && !isCancelled) {
                console.log("[page] Background resolution success:", slug);
                if (Capacitor.isNativePlatform()) {
                    setResolvedSlug(slug);
                } else {
                    router.replace(`/${slug}`);
                }
            }
        };

        // Start significant location monitoring on iOS
        if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'ios') {
            import('@/lib/significantLocation').then(({ significantLocationService }) => {
                if (isCancelled) return;
                significantLocationService.start();
                significantLocationService.addListener(() => {
                    console.log("[page] Significant location change detected, re-attempting resolution...");
                    attemptResolve();
                }).then(handle => {
                    listenerHandle = handle;
                });
            }).catch(err => {
                console.warn("[page] Failed to start significant location monitoring:", err);
            });
        }

        // Fallback: poll every 5 seconds (all platforms)
        const poll = async () => {
            if (isCancelled) return;
            await attemptResolve();
            if (!isCancelled) {
                setTimeout(poll, 5000);
            }
        };
        poll();

        return () => {
            isCancelled = true;
            // Cleanup significant location monitoring
            if (listenerHandle) {
                listenerHandle.remove?.();
            }
            if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'ios') {
                import('@/lib/significantLocation').then(({ significantLocationService }) => {
                    significantLocationService.stop();
                }).catch(() => {});
            }
        };
    }, [state, resolvedSlug, searchParams, router]);

    // Check if WiFi profile is already installed on the device
    useEffect(() => {
        if (state !== 'tenant_not_found') return;
        wifiProfileService.isProfileInstalled().then(setHasWifiProfile);
    }, [state]);

    // Mark instructions as seen after they appear to disable future animations
    useEffect(() => {
        if (state === 'tenant_not_found' && !hasSeenInstructions) {
            const timer = setTimeout(() => {
                setHasSeenInstructions(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [state, hasSeenInstructions]);

    // If tenant is resolved on native, render TenantChatClient directly
    if (resolvedSlug) {
        return <TenantChatClient overrideSlug={resolvedSlug} />;
    }

    // Onboarding — shows FIRST on fresh install, before discovery starts
    if (showOnboarding === true) {
        return <OnboardingScreen onComplete={() => setShowOnboarding(false)} />;
    }

    // Loading state (discovery in progress, or onboarding check still pending)
    if (state === 'loading' || showOnboarding === null) {
        return <DiscoveryScreen />;
    }

    if (showMap) {
        return <SearchSpacesScreen onBack={() => setShowMap(false)} />;
    }

    if (showAutoConnect) {
        return <AutoConnectScreen onBack={() => setShowAutoConnect(false)} />;
    }

    if (showHowItWorks) {
        return <HowItWorks onBack={() => setShowHowItWorks(false)} />;
    }

    // Error states (Instruction Screen)
    return (
        <div className="h-screen w-full flex flex-col bg-white overflow-hidden pb-safe">
            {/* Precise Location Banner */}
            {isPreciseOff && (
                <div className="w-full bg-amber-50 border-b border-amber-200 px-4 py-3 pt-safe">
                    <div className="flex items-center gap-3 max-w-md mx-auto">
                        <LocateFixed className="w-5 h-5 text-amber-600 shrink-0" />
                        <p className="text-amber-800 text-sm font-medium">
                            Per identificare lo spazio, attiva la Posizione Precisa nelle Impostazioni.
                        </p>
                    </div>
                </div>
            )}

            {/* Header Content */}
            <div className={`flex-1 flex flex-col items-center justify-center p-6 text-center ${!hasSeenInstructions ? 'animate-header-reveal animate-header-slide-up [animation-delay:0s,1.2s]' : ''} will-change-transform`}>
                <img src="/local_logo.svg" alt="Local Logo" className="w-20 h-20 mb-4 object-contain" />

                <h1 className="text-3xl font-black text-gray-900 mb-2">
                    Sei quasi dei nostri!
                </h1>
                <p className="text-gray-500 font-medium max-w-[280px] mb-8">
                    Per entrare in Local devi trovarti in uno degli spazi aderenti.{" "}
                    <button
                        onClick={() => setShowHowItWorks(true)}
                        className="text-primary font-bold hover:underline"
                    >
                        Scopri come funziona
                    </button>
                </p>

                {/* Instruction Card — hidden when WiFi profile is already installed */}
                {!hasWifiProfile && (
                    <div className={`w-full max-w-md px-4 mx-auto ${!hasSeenInstructions ? 'animate-card-reveal [animation-delay:1.2s]' : ''} will-change-transform`}>
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
                                    className="bg-primary text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-md active:scale-95 whitespace-nowrap"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    Connettimi in automatico
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Branded Footer Banner */}
            <div className={`w-full max-w-md mx-auto px-4 pb-12 pt-0 ${!hasSeenInstructions ? 'animate-card-reveal [animation-delay:1.4s]' : ''} will-change-transform`}>
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
