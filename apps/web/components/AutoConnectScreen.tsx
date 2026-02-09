'use client';

import { ArrowLeft, ShieldCheck, Download, Sparkles } from "lucide-react";
import { CapacitorWifi } from '@capgo/capacitor-wifi';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { useEffect } from 'react';
import { Browser } from '@capacitor/browser';

interface AutoConnectScreenProps {
    onBack: () => void;
}

export function AutoConnectScreen({ onBack }: AutoConnectScreenProps) {
    const handleEnable = async () => {
        // 1. Attempt immediate active connection on native
        if (Capacitor.isNativePlatform()) {
            try {
                await Haptics.impact({ style: ImpactStyle.Medium });
                await CapacitorWifi.connect({
                    ssid: "Local - WiFi",
                    password: "localwifisicuro",
                });
            } catch (error) {
                console.warn("Immediate native WiFi connection failed", error);
            }
        }

        // 2. Trigger persistent profile download (essential for iOS/macOS persistence)
        await downloadProfile();
    };

    const downloadProfile = async () => {
        const ssid = "Local - WiFi";
        const password = "localwifisicuro";

        // Generate .mobileconfig for iOS/macOS
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

        if (Capacitor.isNativePlatform()) {
            // On native, use Browser plugin to open the data URI. 
            // This is more reliable for triggering the iOS profile installation prompt.
            const base64Profile = btoa(profile);
            const dataUri = `data:application/x-apple-aspen-config;base64,${base64Profile}`;

            try {
                await Browser.open({ url: dataUri });
            } catch (err) {
                console.error("Browser failed to open profile URI", err);
            }
        } else {
            const blob = new Blob([profile], { type: 'application/x-apple-aspen-config' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'LocalWiFi.mobileconfig';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
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
