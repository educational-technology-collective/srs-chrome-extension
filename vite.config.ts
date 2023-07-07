import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
  // build: {
  //   rollupOptions: {
  //     input: {
  //       content: "src/chrome-services/content.ts",
  //       serviceWorker: "src/chrome-services/serviceWorker.ts",
  //       main: "index.html",
  //     },
  //     output: {
  //       entryFileNames: `assets/[name].js`,
  //       chunkFileNames: `assets/[name].js`,
  //       assetFileNames: `assets/[name].[ext]`,
  //     },
  //   },
  // },
});
