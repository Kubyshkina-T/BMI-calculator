import { defineConfig } from "vite";

export default defineConfig({
  build: {
    sourcemap: true, 
    rollupOptions: {
      input: {
        main: "index.html",
        under: "page-under.html",
        norm: "page-norm.html",
        over: "page-over.html",
      },
    },
  },
});