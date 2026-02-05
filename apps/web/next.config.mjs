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
        return [
            // Tenant API is now handled by Next.js API route at /app/api/tenants/[slug]/route.ts
            {
                source: '/api/messages/:path*',
                destination: `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'}/api/messages/:path*`,
            },
            {
                source: '/api/validate-nas',
                destination: `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'}/api/tenants/validate-nas`,
            },
        ];
    },
};

export default nextConfig;
