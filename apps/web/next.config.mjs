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

    async rewrites() {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
        // In local dev, we swap 3000 for 3001. In prod, we use the same URL but let
        // the infrastructure handle routing or use port 3001 if specified.
        const apiUrl = serverUrl.includes(':3000')
            ? serverUrl.replace(':3000', ':3001')
            : (serverUrl.includes('localhost') ? 'http://localhost:3001' : serverUrl);

        return [
            // Tenant API is now handled by Next.js API route at /app/api/tenants/[slug]/route.ts
            {
                source: '/api/messages/:path*',
                destination: `${apiUrl}/api/messages/:path*`,
            },
            {
                source: '/api/validate-nas',
                destination: `${apiUrl}/api/tenants/validate-nas`,
            },
        ];
    },
};

export default nextConfig;
