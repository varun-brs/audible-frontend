import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/audible-frontend",
  outDir: path.resolve(__dirname, "../backend/public"), // Ensure built files go to backend
  assetsDir: "assets",
});
