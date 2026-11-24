import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Photos are resized at build time (scripts/variants.mjs), not by Vercel's metered optimizer.
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    imageSizes: [160, 256, 384],
    deviceSizes: [640, 828, 1200, 2000],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
