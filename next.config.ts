import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  webpack: (config) => {
    interface WebpackRule {
      oneOf?: Array<{
        test?: RegExp | string;
        use?: Array<{ loader?: string }>;
      }>;
    }
    const rules = config.module?.rules as WebpackRule[] | undefined;
    const oneOfRule = rules?.find(
      (rule) => typeof rule === "object" && rule !== null && Array.isArray(rule.oneOf)
    );
    if (oneOfRule?.oneOf) {
      for (const rule of oneOfRule.oneOf) {
        if (rule.test && rule.test.toString().includes("css")) {
          if (Array.isArray(rule.use)) {
            rule.use.push({
              loader: "@tailwindcss/turbopack",
            });
          }
        }
      }
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
