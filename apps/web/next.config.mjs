import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the root .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: process.env.NEXT_STATIC_EXPORT === 'true' ? 'export' : 'standalone',
    images: {
        unoptimized: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    productionBrowserSourceMaps: false,
    experimental: {
        cpus: 1,
        workerThreads: false,
    },

    async rewrites() {
        const apiUrl = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(':3000', ':3001');
        return [
            // Tenant API is now handled directly via Nginx in prod, and this rewrite in dev
            {
                source: '/api/tenants/validate-nas',
                destination: `${apiUrl}/api/tenants/validate-nas`,
            },
        ];
    },
};

export default nextConfig;
