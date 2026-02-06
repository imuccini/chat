import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the root .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: (process.env.NODE_ENV !== 'development' && process.env.NEXT_STATIC_EXPORT === 'true') ? 'export' : undefined,
    images: {
        unoptimized: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },

    async headers() {
        return [
            {
                // Apply CORS headers to all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "capacitor://localhost" },
                    { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
                    { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization, Cookie, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version" },
                ],
            },
        ];
    },

    async rewrites() {
        return [
            // Tenant API is now handled by Next.js API route at /app/api/tenants/[slug]/route.ts
            {
                source: '/api/validate-nas',
                destination: `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'}/api/tenants/validate-nas`,
            },
        ];
    },
};

export default nextConfig;
