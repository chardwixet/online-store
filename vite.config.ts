import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@assets": "/src/assets",
      "@store": "/src/store",
      "@hooks": "/src/hooks",
    },
  },
  server: {
    proxy: {
      "/products": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
