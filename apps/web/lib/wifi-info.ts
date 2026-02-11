import { registerPlugin } from '@capacitor/core';

export interface WifiInfoResult {
    ssid: string | null;
    bssid: string | null;
    isPrecise: boolean;
    locationPermission: 'always' | 'whenInUse' | 'denied' | 'restricted' | 'notDetermined' | 'unknown';
}

export interface WifiInfoPlugin {
    getInfo(): Promise<WifiInfoResult>;
}

const WifiInfo = registerPlugin<WifiInfoPlugin>('WifiInfo');

export default WifiInfo;
