/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["localhost"],
  },
  swcMinify: true,
};

module.exports = nextConfig;
