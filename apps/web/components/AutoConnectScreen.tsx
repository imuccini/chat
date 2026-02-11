'use client';

import { ArrowLeft, ShieldCheck, Download } from "lucide-react";
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { wifiProfileService, WIFI_SSID, WIFI_PASSWORD } from '@/lib/wifiProfileService';

interface AutoConnectScreenProps {
    onBack: () => void;
}

export function AutoConnectScreen({ onBack }: AutoConnectScreenProps) {
    const handleEnable = async () => {
        const platform = Capacitor.getPlatform();

        if (platform === 'ios' || platform === 'android') {
            await Haptics.impact({ style: ImpactStyle.Medium }).catch(() => {});
            await wifiProfileService.installProfile();

            // On Android, also try immediate connection
            if (platform === 'android') {
                try {
                    const { default: WifiConfig } = await import('@/lib/wifi-config');
                    await WifiConfig.connectImmediate({ ssid: WIFI_SSID, password: WIFI_PASSWORD });
                } catch {
                    // Immediate connection is best-effort
                }
            }
        } else {
            // Web/macOS fallback: download .mobileconfig
            wifiProfileService.downloadMobileconfig();
        }
    };

    return (
        <div className="h-screen w-full flex flex-col bg-white">
            {/* Header - Taller & Borderless */}
            <div className="flex items-center min-h-[5.5rem] px-4 bg-white z-[1000] pt-safe">
                <button
                    onClick={onBack}
                    className="p-3 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-7 h-7 text-gray-900" />
                </button>
                <h2 className="ml-2 text-xl font-black text-gray-900">Connessione automatica</h2>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-[32px] flex items-center justify-center mb-8">
                    <ShieldCheck className="w-10 h-10 text-primary" strokeWidth={2.5} />
                </div>

                <h1 className="text-2xl font-black text-gray-900 mb-4 px-4">
                    Connessione automatica e sicura
                </h1>

                <p className="text-gray-500 font-medium leading-relaxed max-w-[300px] mb-12">
                    Salva la rete WiFi per connetterti in automatico quando sei in uno spazio Local.
                </p>

                <div className="w-full max-w-xs space-y-4">
                    <button
                        onClick={handleEnable}
                        className="w-full py-5 bg-primary text-white rounded-[24px] font-bold shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
                    >
                        <Download className="w-6 h-6" />
                        Abilita
                    </button>

                    <p className="text-[0.7rem] text-gray-400 font-medium px-4">
                        Verrà scaricato un profilo WiFi configurato per "Local - WiFi". Questo garantisce che il telefono si connetta automaticamente anche in futuro.
                    </p>
                </div>
            </div>

            <div className="p-8 text-center text-[0.75rem] text-gray-400 font-medium safe-bottom">
                Disponibile per iOS, Android e macOS.
            </div>
        </div>
    );
}
