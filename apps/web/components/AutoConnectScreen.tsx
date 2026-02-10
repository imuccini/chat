'use client';

import { ArrowLeft, ShieldCheck, Download, Sparkles } from "lucide-react";
import { CapacitorWifi } from '@capgo/capacitor-wifi';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { useEffect } from 'react';
import WifiConfig from '@/lib/wifi-config';

interface AutoConnectScreenProps {
    onBack: () => void;
}

export function AutoConnectScreen({ onBack }: AutoConnectScreenProps) {
    const handleEnable = async () => {
        const ssid = "Local - WiFi";
        const password = "localwifisicuro";

        // Native iOS: Setup persistent profile via custom plugin
        if (Capacitor.getPlatform() === 'ios') {
            try {
                await Haptics.impact({ style: ImpactStyle.Medium });
                // On iOS, this triggers the system pop-up to approve/configure the network
                const result = await WifiConfig.connect({ ssid, password });
                console.log("iOS Native WiFi setup approved:", result);
            } catch (error) {
                console.error("iOS Native WiFi setup failed or cancelled:", error);
            }
        }

        // Native Android: Configure network suggestion for persistence
        else if (Capacitor.getPlatform() === 'android') {
            try {
                await Haptics.impact({ style: ImpactStyle.Medium });
                // We add a suggestion so it connects automatically in the future
                await WifiConfig.addSuggestion({ ssid, password });
                // We also try an immediate connection for the current session
                await WifiConfig.connectImmediate({ ssid, password });
            } catch (error) {
                console.warn("Android WiFi setup/connection failed", error);
            }
        }

        // Web/macOS Fallback: Download .mobileconfig
        else {
            downloadProfile(ssid, password);
        }
    };

    const downloadProfile = (ssid: string, password: string) => {
        // Generate .mobileconfig for Web/macOS
        const profile = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PayloadContent</key>
    <array>
        <dict>
            <key>AutoJoin</key>
            <true/>
            <key>CaptiveBypass</key>
            <false/>
            <key>EncryptionType</key>
            <string>WPA</string>
            <key>HIDDEN_NETWORK</key>
            <false/>
            <key>IsHotspot</key>
            <false/>
            <key>Password</key>
            <string>${password}</string>
            <key>PayloadDescription</key>
            <string>Configures Wi-Fi settings</string>
            <key>PayloadDisplayName</key>
            <string>Wi-Fi (${ssid})</string>
            <key>PayloadIdentifier</key>
            <string>com.local.wifi.config.1</string>
            <key>PayloadType</key>
            <string>com.apple.wifi.managed</string>
            <key>PayloadUUID</key>
            <string>ED144B65-8E7B-4E3F-ADEC-C3A6284D8D31</string>
            <key>PayloadVersion</key>
            <integer>1</integer>
            <key>ProxyType</key>
            <string>None</string>
            <key>SSID_STR</key>
            <string>${ssid}</string>
        </dict>
    </array>
    <key>PayloadDescription</key>
    <string>Local WiFi Auto-Connect Profile</string>
    <key>PayloadDisplayName</key>
    <string>Local WiFi</string>
    <key>PayloadIdentifier</key>
    <string>com.local.wifi.config</string>
    <key>PayloadOrganization</key>
    <string>Local</string>
    <key>PayloadRemovalDisallowed</key>
    <false/>
    <key>PayloadType</key>
    <string>Configuration</string>
    <key>PayloadUUID</key>
    <string>B4C9E2C7-1C4C-5C2B-AC2B-2B3C4D5E6F7A</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
</dict>
</plist>`;

        const blob = new Blob([profile], { type: 'application/x-apple-aspen-config' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'LocalWiFi.mobileconfig';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
