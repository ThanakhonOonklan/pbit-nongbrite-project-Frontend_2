import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SWC minifier is enabled by default in Next.js 16+
  
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"],
    } : false,
  },
  
  // Optimize package imports for better tree-shaking
  experimental: {
    optimizePackageImports: [
      "react-icons",
      "motion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-tooltip",
    ],
  },
  
  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
