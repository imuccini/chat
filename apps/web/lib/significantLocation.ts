import { registerPlugin, PluginListenerHandle } from '@capacitor/core';
import { Capacitor } from '@capacitor/core';

export interface LocationChangeEvent {
    latitude: number;
    longitude: number;
    accuracy: number;
    timestamp: number;
}

export interface SignificantLocationPlugin {
    start(): Promise<{ status: string }>;
    stop(): Promise<{ status: string }>;
    addListener(
        eventName: 'locationChange',
        listenerFunc: (event: LocationChangeEvent) => void
    ): Promise<PluginListenerHandle>;
}

const SignificantLocation = registerPlugin<SignificantLocationPlugin>('SignificantLocation');

export const significantLocationService = {
    async start(): Promise<void> {
        if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'ios') return;

        try {
            await SignificantLocation.start();
            console.log('[SignificantLocation] Monitoring started');
        } catch (err) {
            console.warn('[SignificantLocation] Failed to start:', err);
        }
    },

    async stop(): Promise<void> {
        if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'ios') return;

        try {
            await SignificantLocation.stop();
            console.log('[SignificantLocation] Monitoring stopped');
        } catch (err) {
            console.warn('[SignificantLocation] Failed to stop:', err);
        }
    },

    async addListener(
        callback: (event: LocationChangeEvent) => void
    ): Promise<PluginListenerHandle | null> {
        if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'ios') return null;

        try {
            return await SignificantLocation.addListener('locationChange', callback);
        } catch (err) {
            console.warn('[SignificantLocation] Failed to add listener:', err);
            return null;
        }
    }
};
