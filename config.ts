import { Capacitor } from '@capacitor/core';

// Detect if running natively (iOS or Android)
const isNative = Capacitor.isNativePlatform();

// Use local IP for native (simulator/device) or empty string for web (proxy)
// REPLACE '192.168.8.213' WITH YOUR COMPUTER'S LOCAL IP IF IT CHANGES
export const API_BASE_URL = isNative ? 'http://192.168.1.111:3000' : '';
