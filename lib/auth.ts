import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { passkey } from "@better-auth/passkey";
import { anonymous } from "better-auth/plugins";
import { prisma } from "./db";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    debug: true, // Enable debug logs
    plugins: [
        passkey({
            rpID: process.env.RP_ID || "192.168.8.213",
            rpName: "Local",
            origin: process.env.BETTER_AUTH_URL || "http://localhost:3000"
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
            phoneNumber: {
                type: "string",
                required: false
            },
            gender: {
                type: "string",
                required: false
            },
            isAnonymous: {
                type: "boolean",
                required: false
            }
        }
    },
    trustedOrigins: [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "capacitor://localhost",
        "http://localhost",
        process.env.BETTER_AUTH_URL || "",
        process.env.NEXT_PUBLIC_SERVER_URL || ""
    ].filter(Boolean)
});
