import { registerPlugin } from '@capacitor/core';

export interface WifiConfigPlugin {
    /**
     * Prompts the user to join a specific WiFi network. (iOS focus, or session-based)
     */
    connect(options: { ssid: string; password?: string }): Promise<{ status: string; ssid: string }>;

    /**
     * Removes the WiFi configuration created by the app.
     */
    disconnect(options: { ssid: string }): Promise<{ status: string }>;

    /**
     * Android (10+): Connection immediate/forced using WifiNetworkSpecifier
     */
    connectImmediate(options: { ssid: string; password?: string }): Promise<{ status: string }>;

    /**
     * Android (10+): Install persistent WiFi profile using WifiNetworkSuggestion
     */
    addSuggestion(options: { ssid: string; password?: string }): Promise<{ status: string }>;
}

const WifiConfig = registerPlugin<WifiConfigPlugin>('WifiConfig');

export default WifiConfig;
