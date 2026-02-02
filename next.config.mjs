/** @type {import('next').NextConfig} */
const nextConfig = {
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
