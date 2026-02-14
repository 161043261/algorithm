import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import createMDX from "@next/mdx";
const withMDX = createMDX({});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cwd = process.cwd();
import { PHASE_DEVELOPMENT_SERVER, PHASE_TYPE } from "next/constants";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  turbopack: {
    root: resolve(__dirname, "../../"),
  },
  serverExternalPackages: [cwd, "../../common/temp/node_modules"],

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

export default withMDX(nextConfig);
