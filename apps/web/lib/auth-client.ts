import { createAuthClient } from "better-auth/react";
import { passkeyClient } from "@better-auth/passkey/client";
import { anonymousClient } from "better-auth/client/plugins";

import { Capacitor } from "@capacitor/core";

const isNative = Capacitor.isNativePlatform();

// Robust logic to determine baseURL:
// 1. If we are clearly on native (runtime check check might fail at module load, so we rely on env var content)
// 2. If NEXT_PUBLIC_SERVER_URL is defined and is NOT localhost, assume we want to use that absolute URL (likely mobile/prod)
// 3. Otherwise undefined (relative handling for web)
const envUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const isProductionOrIP = envUrl && !envUrl.includes("localhost") && !envUrl.includes("127.0.0.1");

// Determine if running on localhost in a browser (non-native)
const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';

// Force absolute URL ONLY if:
// 1. We are native (MUST happen)
// 2. We are pointing to a production/IP URL AND we are NOT on localhost (e.g. mobile browser accessing via IP)
// If we are on localhost web, we prefer undefined to use relative paths (proxying) to avoid cross-site cookie issues
const baseURL = (isNative || (isProductionOrIP && !isLocalhost)) ? envUrl : undefined;

export const authClient = createAuthClient({
    // In Browser: use relative path by setting baseURL to undefined/empty
    // In Native: use the full server URL
    baseURL,
    plugins: [
        passkeyClient(),
        anonymousClient()
    ]
});

export const { signIn, signUp, useSession, signOut } = authClient;

