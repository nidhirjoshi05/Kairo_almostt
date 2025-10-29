// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// (Optional) load Replit helper plugins only in non-prod repls
const replitPlugins =
  process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined
    ? [
        await import("@replit/vite-plugin-cartographer").then((m) =>
          m.cartographer(),
        ),
        await import("@replit/vite-plugin-dev-banner").then((m) =>
          m.devBanner(),
        ),
      ]
    : [];

export default defineConfig({
  plugins: [react(), runtimeErrorOverlay(), ...replitPlugins],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },

  root: path.resolve(__dirname, "client"),

  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },

  server: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: true,
    hmr: {
      clientPort: 443,
    },
    // 👇 allow Replit’s dynamic *.pike.replit.dev host
    // You can replace `true` with an explicit array of hosts if you prefer strictness.
    allowedHosts: true,
  },

  preview: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: true,
    // Mirror the dev-server setting for preview mode too
    allowedHosts: true,
  },
});
