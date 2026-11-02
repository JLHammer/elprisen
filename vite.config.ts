import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { VitePWA } from "vite-plugin-pwa";

import { colors } from "./src/styles/theme";

// Replaces %theme.<color>% in index.html with that color from the theme, e.g. %theme.background%
const themeColorsInHtml = (): Plugin => ({
  name: "theme-colors-in-html",
  transformIndexHtml: (html) =>
    html.replace(/%theme\.(\w+)%/g, (_, name: string) => {
      if (!(name in colors))
        throw new Error(`Unknown theme color in index.html: ${name}`);
      return colors[name as keyof typeof colors];
    }),
});

export default defineConfig({
  plugins: [
    react(),
    themeColorsInHtml(),
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
        theme_color: colors.backgroundDark,
        background_color: colors.background,
        icons: [
          ...[48, 72, 96, 144, 192, 512].map((size) => ({
            src: `/icons/android/android-launchericon-${size}-${size}.png`,
            sizes: `${size}x${size}`,
            type: "image/png",
          })),
          {
            src: "/icons/android/maskable-icon-512-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
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
