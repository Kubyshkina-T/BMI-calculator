import { defineConfig } from "vite";

export default defineConfig({
  base: "/BMI-calculator/",
  build: {
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
