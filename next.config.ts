import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
          protocol: 'http',
          hostname: '192.168.100.18',
          port: '8000',
          pathname: '/**',
      },
      {
          protocol: 'https',
          hostname: 'api.blackandwhite.com',
          pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
