/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "picsum.photos",
                port: "",
                pathname: "/id/**",
            },
        ],
    },
};

module.exports = nextConfig;
