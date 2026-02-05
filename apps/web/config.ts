import { Capacitor } from '@capacitor/core';

// Detect if running natively (iOS or Android)
const isNative = Capacitor.isNativePlatform();

// The URL of the Next.js server (handles BetterAuth)
export const SERVER_URL = isNative
    ? (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000')
    : '';

// The URL of the NestJS API/Socket server
// On Web: empty string means same-origin, which allows Next.js rewrites to work
// On Native: we connect directly to the API server on port 3001
export const API_BASE_URL = isNative
    ? (process.env.NEXT_PUBLIC_SERVER_URL?.replace(':3000', ':3001') || 'http://localhost:3001')
    : ''; // Same-origin on web - Next.js rewrites will proxy to port 3001

// For Socket.IO Specifically
// On Web: Use network IP so it works from any device on the network
// On Native: Connect directly to the API server
export const SOCKET_URL = isNative
    ? (process.env.NEXT_PUBLIC_SERVER_URL?.replace(':3000', ':3001') || 'http://localhost:3001')
    : (process.env.NEXT_PUBLIC_SERVER_URL?.replace(':3000', ':3001') || 'http://localhost:3001');

if (isNative) {
    console.log("[ChatConfig] Native Platform Detected. SOCKET_URL:", SOCKET_URL);
}
