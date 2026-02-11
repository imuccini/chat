import { Capacitor } from '@capacitor/core';

// Dynamic import to avoid issues on web
let CapacitorWifi: any = null;

async function loadWifiPlugin() {
    if (Capacitor.isNativePlatform() && !CapacitorWifi) {
        try {
            const module = await import('@capgo/capacitor-wifi');
            CapacitorWifi = module.CapacitorWifi;
        } catch (err) {
            console.error('Failed to load WiFi plugin:', err);
        }
    }
    return CapacitorWifi;
}

export interface WifiInfo {
    ssid: string | null;
    bssid: string | null;
    isConnected: boolean;
    isPreciseOff?: boolean;
}

/**
 * Get the BSSID of the currently connected WiFi network.
 * On iOS, uses the custom WifiInfo native plugin (NEHotspotNetwork.fetchCurrent).
 * On Android, uses @capgo/capacitor-wifi.
 * Returns null on web or if not connected to WiFi.
 */
export async function getConnectedWifiInfo(): Promise<WifiInfo> {
    if (!Capacitor.isNativePlatform()) {
        return { ssid: null, bssid: null, isConnected: false };
    }

    // iOS: Use custom WifiInfo plugin for proper async BSSID retrieval
    if (Capacitor.getPlatform() === 'ios') {
        try {
            const { default: WifiInfo } = await import('@/lib/wifi-info');
            const info = await WifiInfo.getInfo();

            // If precise location is off, BSSID won't be accurate
            if (!info.isPrecise) {
                return { ssid: null, bssid: null, isConnected: false, isPreciseOff: true };
            }

            return {
                ssid: info.ssid || null,
                bssid: info.bssid || null,
                isConnected: !!info.ssid
            };
        } catch (err) {
            console.error('Error getting WiFi info via WifiInfo plugin:', err);
            return { ssid: null, bssid: null, isConnected: false };
        }
    }

    // Android: Use @capgo/capacitor-wifi
    const wifi = await loadWifiPlugin();
    if (!wifi) {
        return { ssid: null, bssid: null, isConnected: false };
    }

    try {
        const info = await wifi.getWifiInfo();
        return {
            ssid: info.ssid || null,
            bssid: info.bssid || null,
            isConnected: !!info.ssid
        };
    } catch (err) {
        console.error('Error getting WiFi info:', err);
        return { ssid: null, bssid: null, isConnected: false };
    }
}

/**
 * Check precise location status on iOS.
 * Returns { isPrecise: true } on non-iOS or web platforms.
 */
export async function checkPreciseLocation(): Promise<{ isPrecise: boolean }> {
    if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'ios') {
        return { isPrecise: true };
    }

    try {
        const { default: WifiInfo } = await import('@/lib/wifi-info');
        const info = await WifiInfo.getInfo();
        return { isPrecise: info.isPrecise };
    } catch {
        return { isPrecise: true };
    }
}

/**
 * Check and request location permissions required for WiFi info.
 * Returns true if permissions are granted, false otherwise.
 */
export async function checkAndRequestLocationPermissions(): Promise<boolean> {
    if (!Capacitor.isNativePlatform()) {
        return true; // Not needed on web
    }

    const wifi = await loadWifiPlugin();
    if (!wifi) {
        return false;
    }

    try {
        // Check current permission status
        const status = await wifi.checkPermissions();

        if (status.location === 'granted') {
            return true;
        }

        // Request permissions if not granted
        const result = await wifi.requestPermissions();
        return result.location === 'granted';
    } catch (err) {
        console.error('Error checking/requesting permissions:', err);
        return false;
    }
}

/**
 * Check if WiFi is enabled on the device.
 */
export async function isWifiEnabled(): Promise<boolean> {
    if (!Capacitor.isNativePlatform()) {
        return true; // Assume true on web
    }

    const wifi = await loadWifiPlugin();
    if (!wifi) {
        return false;
    }

    try {
        const status = await wifi.getStatus();
        return status.enabled;
    } catch (err) {
        console.error('Error checking WiFi status:', err);
        return false;
    }
}
