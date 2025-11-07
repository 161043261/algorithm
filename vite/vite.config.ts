import { fileURLToPath, resolve, URL } from "node:url";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log("[vite.config.ts] __dirname:", __dirname);

// https://vite.dev/config/
export default defineConfig({
  root: resolve(__dirname, "../src"),
  build: {
    outDir: resolve(__dirname, "./dist"),
  },
  plugins: [react(), vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
