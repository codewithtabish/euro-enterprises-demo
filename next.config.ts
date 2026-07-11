import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",   // Allows ALL domains
      },
      {
        protocol: "http",
        hostname: "**",   // Optional: also allow HTTP (not recommended for production)
      },
    ],
    qualities: [75, 90],
  },
  
};

export default nextConfig;