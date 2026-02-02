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
}

/**
 * Get the BSSID of the currently connected WiFi network.
 * Returns null on web or if not connected to WiFi.
 */
export async function getConnectedWifiInfo(): Promise<WifiInfo> {
    if (!Capacitor.isNativePlatform()) {
        return { ssid: null, bssid: null, isConnected: false };
    }

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
