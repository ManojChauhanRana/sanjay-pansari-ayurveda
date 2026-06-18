import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com"
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000"
      },
      {
        protocol: "https",
        hostname: "**.supabase.co"
      },
      {
        protocol: "https",
        hostname: "**.gstatic.com"
      }
    ]
  }
};

export default nextConfig;
