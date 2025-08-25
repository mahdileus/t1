/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 't1w.ir',
      pathname: '/uploads/**',
    },
  ],
},

};

export default nextConfig;
