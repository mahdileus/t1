/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 't1w.ir',
        port: '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'www.t1w.ir',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
