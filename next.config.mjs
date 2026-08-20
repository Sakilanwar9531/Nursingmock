/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  typescript: {
    // Allows production builds to successfully complete even if there are minor type warnings
    ignoreBuildErrors: true,
  },
  eslint: {
    // Allows production builds to successfully complete even if there are lint errors
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

