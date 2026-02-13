import { Capacitor } from '@capacitor/core';

// Detect if running natively (iOS or Android)
const isNative = Capacitor.isNativePlatform();

// The URL of the Next.js server (handles BetterAuth)
export const SERVER_URL = isNative
    ? (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000')
    : '';

// The URL of the NestJS API/Socket server
// On Native: Connect directly to the API server
//   - Development (with port): Replace :3000 with :3001
//   - Production (no port): Use the same URL (server should handle routing)
// On Web (Dev): Connect to port 3001 (NestJS) directly
// On Web (Prod): Use relative path (Nginx handles proxying to 3001)
const isDevelopment = process.env.NODE_ENV === 'development';

// Helper function to resolve API URL for native apps
const resolveNativeApiUrl = (serverUrl?: string): string => {
    if (!serverUrl) return 'http://localhost:3001';

    // Check if the URL includes a port (development mode)
    const hasPort = /:\d+$/.test(serverUrl);

    if (hasPort && serverUrl.includes(':3000')) {
        // Dev mode: Replace Next.js port with NestJS port
        return serverUrl.replace(':3000', ':3001');
    }

    // Production mode: URL has no port, use as-is
    // Assumes your production setup either:
    //   1. Has nginx proxying /api and /socket.io to port 3001
    //   2. Or NestJS is exposed directly on 443/80
    return serverUrl;
};

export const API_BASE_URL = isNative
    ? resolveNativeApiUrl(process.env.NEXT_PUBLIC_SERVER_URL)
    : (isDevelopment
        ? (typeof window !== 'undefined'
            ? `${window.location.protocol}//${window.location.hostname}:3001`
            : 'http://127.0.0.1:3001') // Force localhost for SSR on web dev
        : ''); // Relative path for production

// For Socket.IO Specifically
export const SOCKET_URL = isNative
    ? resolveNativeApiUrl(process.env.NEXT_PUBLIC_SERVER_URL)
    : (isDevelopment
        ? (typeof window !== 'undefined'
            ? `${window.location.protocol}//${window.location.hostname}:3001`
            : 'http://127.0.0.1:3001')
        : ''); // Relative path for production

if (isNative) {
    console.log("[ChatConfig] Native Platform Detected. SOCKET_URL:", SOCKET_URL);
}
