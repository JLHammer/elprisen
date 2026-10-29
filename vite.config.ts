import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      registerType: "autoUpdate",
      injectRegister: false,

      manifest: {
        name: "Elprisen",
        short_name: "Elprisen",
        description: "Se dagens elpriser time for time",
        lang: "da",
        display: "standalone",
        theme_color: "#201E1E",
        background_color: "#27282B",
        icons: [48, 72, 96, 144, 192, 512].map((size) => ({
          src: `/icons/android/android-launchericon-${size}-${size}.png`,
          sizes: `${size}x${size}`,
          type: "image/png",
        })),
      },

      injectManifest: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2}"],
      },

      devOptions: {
        enabled: true,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
});
