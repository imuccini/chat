/** @type {import('next').NextConfig} */
const nextConfig = {
    output: (process.env.NODE_ENV !== 'development' && process.env.NEXT_STATIC_EXPORT === 'true') ? 'export' : undefined,
    images: {
        unoptimized: true,
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        //
        // This is useful for deployment on low-memory servers (Droplets) where 
        // the Type Checker runs out of memory. We check types locally anyway.
        ignoreBuildErrors: true,
    },
    eslint: {
        // Also ignore ESLint during build to save memory
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
