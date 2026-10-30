import { defineConfig } from "@vite-pwa/assets-generator/config";

const background = "#27282B";

export default defineConfig({
  preset: {
    transparent: {
      sizes: [48, 72, 96, 144, 192, 512],
      padding: 0,
      favicons: [[48, "favicon.ico"]],
    },
    maskable: {
      sizes: [512],
      padding: 0.2,
      resizeOptions: { background },
    },
    apple: {
      sizes: [180],
      padding: 0.1,
      resizeOptions: { background },
    },
    assetName: (type, { width }) => {
      if (type === "apple") return "icons/ios/180.png";
      if (type === "maskable") return `icons/android/maskable-icon-${width}-${width}.png`;
      return `icons/android/android-launchericon-${width}-${width}.png`;
    },
  },
  images: ["public/favicon.svg"],
});
