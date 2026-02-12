import { Capacitor } from '@capacitor/core';

// Detect if running natively (iOS or Android)
const isNative = Capacitor.isNativePlatform();

// The URL of the Next.js server (handles BetterAuth)
export const SERVER_URL = isNative
    ? (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000')
    : '';

// The URL of the NestJS API/Socket server
// On Native: Connect directly to the API server on port 3001
// On Web (Dev): Connect to port 3001 (NestJS) directly
// On Web (Prod): Use relative path (Nginx handles proxying to 3001)
const isDevelopment = process.env.NODE_ENV === 'development';

export const API_BASE_URL = isNative
    ? (process.env.NEXT_PUBLIC_SERVER_URL?.replace(':3000', ':3001') || 'http://localhost:3001')
    : (isDevelopment
        ? (typeof window !== 'undefined'
            ? `${window.location.protocol}//${window.location.hostname}:3001`
            : 'http://127.0.0.1:3001') // Force localhost for SSR on web dev
        : ''); // Relative path for production

// For Socket.IO Specifically
export const SOCKET_URL = isNative
    ? (process.env.NEXT_PUBLIC_SERVER_URL?.replace(':3000', ':3001') || 'http://localhost:3001')
    : (isDevelopment
        ? (typeof window !== 'undefined'
            ? `${window.location.protocol}//${window.location.hostname}:3001`
            : 'http://127.0.0.1:3001')
        : ''); // Relative path for production

if (isNative) {
    console.log("[ChatConfig] Native Platform Detected. SOCKET_URL:", SOCKET_URL);
}
