import { Capacitor } from '@capacitor/core';

// Detect if running natively (iOS or Android)
const isNative = Capacitor.isNativePlatform();

// Use env variable or fallback
// Set NEXT_PUBLIC_SERVER_URL in .env to your local IP (e.g. http://192.168.1.x:3000)
export const API_BASE_URL = isNative
    ? (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000')
    : '';
