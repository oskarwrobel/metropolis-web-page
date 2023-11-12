"use strict";

/* eslint-env node */

import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
  assetsInclude: ["**/*.png"],
  test: {
    environment: "jsdom",
  },
  plugins: [
    createHtmlPlugin({
      entry: "/src/index.js",
      template: "public/index.html",
    }),
  ],
  define: {
    ANALYTICS: JSON.stringify(process.env.analytics),
  },
});
