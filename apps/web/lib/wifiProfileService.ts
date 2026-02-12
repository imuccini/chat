import { Capacitor } from '@capacitor/core';
import { sqliteService } from '@/lib/sqlite';

export const WIFI_SSID = "Local - WiFi";
export const WIFI_PASSWORD = "localwifisicuro";

const SETTING_KEY = 'wifi_profile_opted_in';

export const wifiProfileService = {
    async hasOptedIn(): Promise<boolean> {
        if (!Capacitor.isNativePlatform()) return false;

        try {
            await sqliteService.initialize();
            const value = await sqliteService.getSetting(SETTING_KEY);
            return value === 'true';
        } catch {
            return false;
        }
    },

    async setOptedIn(status: boolean): Promise<void> {
        if (!Capacitor.isNativePlatform()) return;

        try {
            await sqliteService.initialize();
            await sqliteService.setSetting(SETTING_KEY, status ? 'true' : 'false');
        } catch (err) {
            console.error('Failed to save WiFi profile opt-in status:', err);
        }
    },

    async isProfileInstalled(): Promise<boolean> {
        const platform = Capacitor.getPlatform();

        if (platform === 'ios') {
            try {
                const { default: WifiConfig } = await import('@/lib/wifi-config');
                const { ssids } = await WifiConfig.getConfiguredSSIDs();
                return ssids.includes(WIFI_SSID);
            } catch {
                return false;
            }
        }

        if (platform === 'android') {
            return this.hasOptedIn();
        }

        return false;
    },

    async installProfile(): Promise<boolean> {
        const platform = Capacitor.getPlatform();

        if (platform !== 'ios' && platform !== 'android') {
            return false;
        }

        // Skip if already opted in
        const alreadyOptedIn = await this.hasOptedIn();
        if (alreadyOptedIn) {
            console.log('[WifiProfileService] Already opted in, skipping install');
            return true;
        }

        try {
            const { default: WifiConfig } = await import('@/lib/wifi-config');

            if (platform === 'ios') {
                await WifiConfig.connect({ ssid: WIFI_SSID, password: WIFI_PASSWORD });
            } else if (platform === 'android') {
                await WifiConfig.addSuggestion({ ssid: WIFI_SSID, password: WIFI_PASSWORD });
            }

            // Record success
            await this.setOptedIn(true);
            return true;
        } catch (err) {
            console.warn('[WifiProfileService] Profile install failed or cancelled:', err);
            return false;
        }
    },

    downloadMobileconfig(): void {
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
            <string>${WIFI_PASSWORD}</string>
            <key>PayloadDescription</key>
            <string>Configures Wi-Fi settings</string>
            <key>PayloadDisplayName</key>
            <string>Wi-Fi (${WIFI_SSID})</string>
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
            <string>${WIFI_SSID}</string>
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
    }
};
