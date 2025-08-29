import { defineConfig, transformerDirectives } from "unocss";

export default defineConfig({
  // ...UnoCSS options
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      night: {
        DEFAULT: "#141414",
        light: "#303030",
        lighter: "#262626",
      },
      purple: {
        DEFAULT: "#7457ff",
        heavy: "#805DFF",
      },
    },
  },
});
