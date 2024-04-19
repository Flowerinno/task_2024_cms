/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    domains: ['localhost', 'host.docker.internal'],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  swcMinify: true,
}

module.exports = nextConfig
