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
            rpID: process.env.RP_ID || "localhost",
            rpName: "TrenoChat",
            origin: process.env.BETTER_AUTH_URL || "http://localhost:3000"
        }),
        anonymous()
    ],
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
    trustedOrigins: [process.env.BETTER_AUTH_URL || "http://localhost:3000"]
});
