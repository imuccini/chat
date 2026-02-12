'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, MapPin, ArrowRight } from 'lucide-react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

interface OnboardingScreenProps {
    onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
    const [step, setStep] = useState(1);
    const [isRequesting, setIsRequesting] = useState(false);

    const totalSteps = Capacitor.isNativePlatform() ? 3 : 1;

    const finishOnboarding = async () => {
        localStorage.setItem('onboarding_done', 'true');
        onComplete();
    };

    // Step 1: Welcome
    const handleStep1 = () => {
        Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
        if (!Capacitor.isNativePlatform()) {
            finishOnboarding();
        } else {
            setStep(2);
        }
    };

    // Step 2: Location permission (must come before WiFi — BSSID retrieval needs location)
    const handleStep2 = async () => {
        setIsRequesting(true);
        Haptics.impact({ style: ImpactStyle.Medium }).catch(() => {});

        try {
            await Promise.race([
                Geolocation.requestPermissions({ permissions: ['location'] }),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Location Timeout')), 5000))
            ]);
        } catch (e) {
            console.warn("Location permission request failed or timed out:", e);
        }

        setIsRequesting(false);
        setStep(3);
    };

    // Step 3: WiFi profile installation (requires location already granted)
    const handleStep3 = async () => {
        setIsRequesting(true);
        Haptics.impact({ style: ImpactStyle.Medium }).catch(() => {});

        try {
            const { default: WifiConfig } = await import('@/lib/wifi-config');
            const platform = Capacitor.getPlatform();

            const wifiPromise = async () => {
                if (platform === 'ios') {
                    await WifiConfig.connect({ ssid: "Local - WiFi", password: "localwifisicuro" });
                } else if (platform === 'android') {
                    await WifiConfig.addSuggestion({ ssid: "Local - WiFi", password: "localwifisicuro" });
                }
            };

            await Promise.race([
                wifiPromise(),
                new Promise((_, reject) => setTimeout(() => reject(new Error('WiFi Timeout')), 5000))
            ]);
        } catch (e) {
            console.warn("WiFi profile install skipped or timed out:", e);
        }

        await finishOnboarding();
    };

    const handleSkip = () => {
        if (step === 2) {
            setStep(3);
        } else if (step === 3) {
            finishOnboarding();
        }
    };

    const renderDots = () => (
        <div className="mt-12 flex gap-3">
            {Array.from({ length: totalSteps }, (_, i) => (
                <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full ${i + 1 <= step ? 'bg-primary' : 'bg-gray-200'}`}
                />
            ))}
        </div>
    );

    return (
        <div className="fixed inset-0 bg-white z-[200] flex flex-col items-center overflow-hidden pb-safe">
            <AnimatePresence mode="wait">
                {step === 1 && (
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

                        {renderDots()}
                    </motion.div>
                )}

                {step === 2 && (
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
                                    <MapPin className="w-10 h-10" />
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-4 leading-tight">
                            Posizione
                        </h2>

                        <p className="text-gray-500 font-medium mb-8 max-w-[300px]">
                            Per identificare automaticamente gli spazi Local, abbiamo bisogno di accedere alla tua posizione.
                        </p>

                        <div className="w-full max-w-xs">
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

                        {renderDots()}
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
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
                                    <Wifi className="w-10 h-10" />
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-4 leading-tight">
                            Profilo WiFi
                        </h2>

                        <p className="text-gray-500 font-medium mb-8 max-w-[300px]">
                            Installa il profilo WiFi per connetterti automaticamente agli spazi Local.
                        </p>

                        <div className="w-full max-w-xs">
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 text-left">
                                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary shrink-0">
                                    <Wifi className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">Profilo WiFi</h4>
                                    <p className="text-xs text-gray-400 font-medium">Accesso automatico sicuro</p>
                                </div>
                            </div>
                        </div>

                        {renderDots()}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="w-full px-8 pb-12 pt-6 space-y-3">
                <button
                    onClick={step === 1 ? handleStep1 : step === 2 ? handleStep2 : handleStep3}
                    disabled={isRequesting}
                    className="w-full h-16 bg-gray-900 rounded-[2rem] flex items-center justify-center gap-3 active:scale-[0.97] transition-all disabled:opacity-50 disabled:scale-100 group shadow-xl"
                >
                    <span className="text-white font-black text-lg">
                        {isRequesting ? 'Configurazione...' : (step === 1 ? 'Continua' : step === 2 ? 'Attiva posizione' : 'Installa profilo')}
                    </span>
                    {!isRequesting && (
                        <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
                    )}
                </button>

                {step > 1 && !isRequesting && (
                    <button
                        onClick={handleSkip}
                        className="w-full h-12 flex items-center justify-center"
                    >
                        <span className="text-gray-400 font-bold text-sm">Non ora</span>
                    </button>
                )}
            </div>
        </div>
    );
}
