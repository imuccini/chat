import { createAuthClient } from "better-auth/react";
import { passkeyClient } from "@better-auth/passkey/client";
import { anonymousClient } from "better-auth/client/plugins";

import { Capacitor } from "@capacitor/core";

const isNative = Capacitor.isNativePlatform();

export const authClient = createAuthClient({
    // In Browser: use relative path by setting baseURL to undefined/empty
    // In Native: use the full server URL
    baseURL: isNative ? (process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000") : undefined,
    plugins: [
        passkeyClient(),
        anonymousClient()
    ]
});

export const { signIn, signUp, useSession, signOut } = authClient;
