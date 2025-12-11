import { fileURLToPath, resolve, URL } from "node:url";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";
import { dirname } from "node:path";
import tailwindcss from "@tailwindcss/vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log("[vite.config.ts] __dirname:", __dirname);

const getConfig = (type: "vue" | "react") =>
  // https://vite.dev/config/
  defineConfig({
    root: resolve(__dirname, "./src"),
    build: {
      outDir: resolve(__dirname, "./vite/dist"),
    },
    plugins: [
      ...(type === "react" ? [react()] : [vue(), vueJsx(), vueDevTools()]),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  });

export default getConfig("react");
// export default getConfig("vue");
