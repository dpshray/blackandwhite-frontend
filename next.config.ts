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
          protocol: 'http',
          hostname: '192.168.100.23',
          port: '8002',
          pathname: '/**',
      },
      {
          protocol: 'https',
          hostname: 'api.blackandwhitetrend.com',
          pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        // port: '8002',        
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
