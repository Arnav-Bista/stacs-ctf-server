import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    resolveAlias: {
      fs: { browser: './empty.ts' },
      path: { browser: './empty.ts' },
      crypto: { browser: './empty.ts' },
    },
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    };
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true
    }

    return config;
  },
};

export default nextConfig;
