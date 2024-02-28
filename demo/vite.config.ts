import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

const srcDir = resolve(__dirname, "src");
const publicDir = resolve(__dirname, "public");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir,
  resolve: {
    alias: {
      "@": srcDir,
      "@generator": resolve(__dirname, resolve(__dirname, "../")),
    },
  },
});
