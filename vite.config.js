import viteHandlebarsPrecompile from "./vite-plugin-handlebars-precompile";

import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  root: resolve(__dirname, "src"),
  build: {
    outDir: resolve(__dirname, "dist"),
    //   rollupOptions: {
    //     input: {
    //       main: resolve(__dirname, "src/index.html"),
    //       login: resolve(__dirname, "src/pages/login/login.html"),
    //       registration: resolve(__dirname, "src/pages/registration/registration.html"),
    //       chat: resolve(__dirname, "src/pages/chat/chat.html"),
    //       profile: resolve(__dirname, "src/pages/profile/settings.html"),
    //       notFound400: resolve(__dirname, "src/pages/not_found/400.html"),
    //       notFound500: resolve(__dirname, "src/pages/not_found/500.html"),
    //     },
    //   },
  },
  server: {
    port: 3000,
  },

  plugins: [viteHandlebarsPrecompile()],

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
