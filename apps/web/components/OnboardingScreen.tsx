'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, MapPin, Sparkles, ChevronRight, BellRing, ArrowRight } from 'lucide-react';
import { checkAndRequestLocationPermissions } from '@/lib/wifi';
import WifiConfig from '@/lib/wifi-config';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

interface OnboardingScreenProps {
    onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
    const [step, setStep] = useState(1);
    const [isRequesting, setIsRequesting] = useState(false);

    const finishOnboarding = () => {
        localStorage.setItem('onboarding_done', 'true');
        onComplete();
    };

    const handleAction = async () => {
        const isNative = Capacitor.isNativePlatform();

        if (step === 1) {
            if (!isNative) {
                // Web/macOS: Just one step
                Haptics.impact({ style: ImpactStyle.Light }).catch(() => { });
                finishOnboarding();
            } else {
                // Native: Go to permissions step
                Haptics.impact({ style: ImpactStyle.Light }).catch(() => { });
                setStep(2);
            }
            return;
        }

        // Step 2 Logic (Native only)
        setIsRequesting(true);
        Haptics.impact({ style: ImpactStyle.Heavy }).catch(() => { });

        const ssid = "Local - WiFi";
        const password = "localwifisicuro";

        // Step 2a: Try WiFi Setup
        try {
            const wifiPromise = async () => {
                if (Capacitor.getPlatform() === 'ios') {
                    // This might hang if capabilities are missing, hence the timeout
                    await WifiConfig.connect({ ssid, password });
                } else if (Capacitor.getPlatform() === 'android') {
                    await WifiConfig.addSuggestion({ ssid, password });
                }
            };

            await Promise.race([
                wifiPromise(),
                new Promise((_, reject) => setTimeout(() => reject(new Error('WiFi Timeout')), 3500))
            ]);
        } catch (e) {
            console.warn("Native WiFi setup skipped, failed or timed out:", e);
        }

        // Step 2b: Request Location Permissions (GPS)
        // Delay ensures system dialogue for WiFi (if any) has a chance to settle
        try {
            const gpsPromise = checkAndRequestLocationPermissions();
            await Promise.race([
                gpsPromise,
                new Promise((_, reject) => setTimeout(() => reject(new Error('GPS Timeout')), 4000))
            ]);
        } catch (e) {
            console.warn("Location permission request failed or timed out:", e);
        }

        // Finalize regardless of results
        finishOnboarding();
    };

    return (
        <div className="fixed inset-0 bg-white z-[200] flex flex-col items-center overflow-hidden pb-safe">
            <AnimatePresence mode="wait">
                {step === 1 ? (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex-1 flex flex-col items-center justify-center p-8 text-center"
                    >
                        <div className="w-24 h-24 mb-10 relative">
                            <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse blur-xl" />
                            <img src="/local_logo.svg" alt="Local Logo" className="w-full h-full object-contain relative z-10" />
                        </div>

                        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4 leading-tight">
                            Benvenuto in <span className="text-primary italic">Local</span>
                        </h1>

                        <p className="text-gray-900 font-bold text-lg leading-relaxed max-w-[300px] mb-4">
                            Il primo hub digitale per spazi fisici.
                        </p>

                        <p className="text-gray-400 font-medium text-sm leading-relaxed max-w-[320px]">
                            Per accedere a Local, devi trovarti fisicamente in uno spazio aderente. In Local, trovi solo persone reali che socializzano vicino a te.
                        </p>

                        <div className="mt-12 flex gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                            <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex-1 flex flex-col items-center justify-center p-8 text-center"
                    >
                        <div className="w-24 h-24 mb-10 flex items-center justify-center">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-primary/5 rounded-full animate-ripple" />
                                <div className="absolute -inset-8 bg-primary/5 rounded-full animate-ripple-delayed" />
                                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary relative z-10">
                                    <Sparkles className="w-10 h-10" />
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-4 leading-tight">
                            Ultimi passaggi
                        </h2>

                        <p className="text-gray-500 font-medium mb-8 max-w-[300px]">
                            Per un'esperienza perfetta, installeremo un profilo WiFi sicuro e ti chiederemo l'accesso alla posizione.
                        </p>

                        <div className="w-full max-w-xs space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 text-left">
                                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary shrink-0">
                                    <Wifi className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">Profilo WiFi</h4>
                                    <p className="text-xs text-gray-400 font-medium">Accesso automatico sicuro</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 text-left">
                                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary shrink-0">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">Posizione</h4>
                                    <p className="text-xs text-gray-400 font-medium">Trova i locali intorno a te</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 flex gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="w-full px-8 pb-12 pt-6">
                <button
                    onClick={handleAction}
                    disabled={isRequesting}
                    className="w-full h-16 bg-gray-900 rounded-[2rem] flex items-center justify-center gap-3 active:scale-[0.97] transition-all disabled:opacity-50 disabled:scale-100 group shadow-xl"
                >
                    <span className="text-white font-black text-lg">
                        {isRequesting ? 'Configurazione...' : (step === 1 ? 'Continua' : 'Inizia ora')}
                    </span>
                    {!isRequesting && (
                        <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
                    )}
                </button>
            </div>
        </div>
    );
}
