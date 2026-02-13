import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { passkey } from "@better-auth/passkey";
import { anonymous } from "better-auth/plugins";
import { prisma } from "./db";

/**
 * Creates a dynamic auth instance based on the current request origin.
 * This is crucial for Passkeys to work across localhost, local IPs, and production.
 */
export const getAuth = (origin: string) => {
    // BetterAuth requires baseURL to be http/https.
    // If the origin is capacitor:// (iOS/Android), use the configured server URL as valid base
    // but keep the original origin in trustedOrigins and for RP ID derivation.
    // Fix for when origin comes from host header without protocol (e.g. "localhost:3000" or "192.168.1.110:3000")
    if (origin && !origin.startsWith("http") && !origin.startsWith("capacitor")) {
        origin = `http://${origin}`;
    }

    // CRITICAL FIX: Normalize localhost and 127.0.0.1 and local IPs to a canonical baseURL
    // This ensures session tokens are signed with the SAME secret regardless of how the app is accessed
    let normalizedOrigin = origin;
    if (origin.includes('localhost') || origin.includes('127.0.0.1') || origin.match(/192\.168\.\d+\.\d+/) || origin.match(/10\.\d+\.\d+\.\d+/)) {
        // Always use localhost:3000 as the canonical baseURL for local development
        normalizedOrigin = 'http://localhost:3000';
    }

    // BetterAuth requires baseURL to be http/https.
    // If the origin is capacitor:// (iOS/Android), use the configured server URL as valid base
    // but keep the original origin in trustedOrigins and for RP ID derivation.
    const isCapacitor = normalizedOrigin.startsWith("capacitor://");
    const isAndroidLocal = normalizedOrigin === "http://localhost";
    const baseURL = (isCapacitor || isAndroidLocal)
        ? (process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000")
        : normalizedOrigin;

    let url: URL;
    try {
        url = new URL(origin);
    } catch (e) {
        console.warn("[getAuth] Invalid origin:", origin, "Using localhost fallback");
        url = new URL("http://localhost:3000");
    }
    const rpID = url.hostname;

    console.error(`[Auth Config] Origin: ${origin}, Normalized: ${normalizedOrigin}, baseURL: ${baseURL}, rpID: ${rpID}`);

    return betterAuth({
        database: prismaAdapter(prisma, {
            provider: "postgresql"
        }),
        secret: process.env.BETTER_AUTH_SECRET,
        baseURL: baseURL,
        debug: true,
        advanced: {
            cookies: {
                sessionDataCookie: {
                    name: "better-auth.session_data",
                    attributes: {
                        httpOnly: false, // CRITICAL: Must be readable by client
                        sameSite: "lax",
                        path: "/",
                        secure: false
                    }
                }
            }
        },
        session: {
            expiresIn: 60 * 60 * 24 * 30, // 30 days
            updateAge: 60 * 60 * 24, // Refresh session expiry every 24 hours
            cookieCache: {
                enabled: true,
                maxAge: 60 * 5 // 5 min client-side cache for instant reads
            }
        },
        plugins: [
            passkey({
                rpID,
                rpName: "Local",
                origin: origin // Keep original origin here for WebAuthn validation
            }),
            anonymous()
        ],
        socialProviders: {
            ...(process.env.GOOGLE_CLIENT_ID && {
                google: {
                    clientId: process.env.GOOGLE_CLIENT_ID,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
                }
            }),
            ...(process.env.APPLE_CLIENT_ID && {
                apple: {
                    clientId: process.env.APPLE_CLIENT_ID,
                    clientSecret: process.env.APPLE_CLIENT_SECRET!,
                }
            })
        },
        user: {
            additionalFields: {
                phoneNumber: { type: "string", required: false },
                gender: { type: "string", required: false },
                isAnonymous: { type: "boolean", required: false },
                role: { type: "string", required: false }
            }
        },
        trustedOrigins: [
            "capacitor://localhost",
            "http://localhost",
            origin,
            baseURL, // Ensure the fallback base is also trusted
            process.env.BETTER_AUTH_URL || "",
            process.env.NEXT_PUBLIC_SERVER_URL || ""
        ].filter((item, index, self) => Boolean(item) && self.indexOf(item) === index),
        callbacks: {
            signIn: async ({ user, account, request }) => {
                const cookies = request?.headers.get('cookie') || "";
                const noSignupCookie = cookies.includes('local_no_signup=true');
                console.error(`[Auth] signIn callback EXEC. User: ${user.email}, noSignupCookie: ${noSignupCookie}, hasCookies: ${!!cookies}`);

                if (noSignupCookie) {
                    // Robust check: if the user was created very recently, it's a new signup attempt.
                    const createdAt = user.createdAt ? new Date(user.createdAt).getTime() : 0;
                    const now = new Date().getTime();
                    const isNew = createdAt > 0 && (now - createdAt < 20000); // 20 second window

                    console.error(`[Auth] Social login restricted check. isNew: ${isNew}, age: ${now - createdAt}ms`);

                    if (isNew) {
                        console.error("[Auth] BLOCKING social signup and cleaning up ghost user:", user.email);
                        try {
                            await prisma.user.delete({ where: { id: user.id } });
                        } catch (e) {
                            console.error("[Auth] Failed to cleanup ghost user:", e);
                        }

                        return {
                            error: "Account non trovato. Questa pagina consente solo l'accesso ad account esistenti.",
                        };
                    }
                }
                return true;
            }
        }
    });
};

/**
 * Returns the auth instance matched to the incoming request.
 */
export const getAuthFromHeaders = async (hList: Headers) => {
    const host = hList.get('host') || 'localhost:3000';
    const protocol = hList.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');
    const origin = hList.get('origin') || `${protocol}://${host}`;
    console.log("[getAuthFromHeaders] Host:", host, "Origin:", origin);
    return getAuth(origin);
};

/**
 * Default auth instance for background tasks or cases where a request is not available.
 * Uses the environment variable as a fallback.
 */
export const auth = getAuth(process.env.BETTER_AUTH_URL || "http://localhost:3000");
