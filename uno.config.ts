import { defineConfig, transformerDirectives } from "unocss";

export default defineConfig({
  // ...UnoCSS options
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      night: {
        DEFAULT: "#161616",
        light: "#232323",
        lighter: "#3E3E3E",
      },
      purple: {
        DEFAULT: "#8E84FF",
        heavy: "#805DFF",
      },
    },
  },
});
