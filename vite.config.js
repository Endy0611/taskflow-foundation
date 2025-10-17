import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";

// ✅ Keep your API domain dynamic for both local + production
const API_BASE = "https://taskflow-api.istad.co";

export default defineConfig({
  plugins: [react(), tailwind()],
  server: {
    host: true, // allows access from LAN / mobile
    port: 5173,
    proxy: {
      // ✅ Prefix all backend calls with /api to avoid CORS issues
      "/api": {
        target: API_BASE,
        changeOrigin: true,
        secure: false,
        // remove "/api" prefix before sending to backend
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  // Optional: better DX logging
  define: {
    __APP_VERSION__: JSON.stringify("1.0.0"),
  },
});
