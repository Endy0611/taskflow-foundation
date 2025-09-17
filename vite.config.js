import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwind()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/api": {
        target: "https://taskflow-api.istad.co",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ""),
      },
    },
  },
});
