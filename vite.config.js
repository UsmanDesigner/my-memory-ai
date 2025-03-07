import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_API_BASE_URL, // Make sure this is correctly set in .env
        changeOrigin: true, // Allow cross-origin requests
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api"), // Ensure correct API path
      },
    },
  },
  plugins: [tailwindcss()],
});
