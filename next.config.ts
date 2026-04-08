import type { NextConfig } from "next";

const repo = "p-luiportfolio"; // ⚠️ coloque aqui o NOME DO SEU REPOSITÓRIO

const nextConfig: NextConfig = {
  output: "export",

  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,

  images: {
    unoptimized: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
