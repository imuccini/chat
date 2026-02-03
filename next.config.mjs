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
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin if needed
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    }
};

export default nextConfig;
