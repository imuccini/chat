import { createAuthClient } from "better-auth/react";
import { passkeyClient } from "@better-auth/passkey/client";
import { anonymousClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000"),
    plugins: [
        passkeyClient(),
        anonymousClient()
    ]
});

export const { signIn, signUp, useSession, signOut } = authClient;
