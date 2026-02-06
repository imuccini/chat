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

// Force absolute URL if we detect we are likely building for mobile/production
const baseURL = isProductionOrIP ? envUrl : undefined;

// DEBUG: Log the configured URL
console.log("[AuthClient] Module Init");
console.log("[AuthClient] isNative (at import):", isNative);
console.log("[AuthClient] NEXT_PUBLIC_SERVER_URL:", envUrl);
console.log("[AuthClient] Computed baseURL:", baseURL);

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

