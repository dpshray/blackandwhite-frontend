import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
  crossOrigin: 'anonymous',
  /* config options here */
  images: {
    unoptimized: isDev,
    remotePatterns: [
      {
          protocol: 'http',
          hostname: '192.168.100.18',
          port: '8000',
          pathname: '/**',
      },
      {
          protocol: 'http',
          hostname: '192.168.100.18',
          port: '8001',
          pathname: '/**',
      },
      {
          protocol: 'http',
          hostname: '192.168.100.18',
          port: '3001',
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
