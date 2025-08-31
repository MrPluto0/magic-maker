import {
  defineConfig,
  presetIcons,
  presetWind4,
  transformerDirectives,
} from "unocss";

export default defineConfig({
  presets: [
    presetWind4(), // 样式预设方案
    presetIcons({}),
    // ...other presets
  ],
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      night: {
        DEFAULT: "#141414",
        light: "#303030",
        lighter: "#262626",
      },
      primary: {
        DEFAULT: "#7457ff",
      },
    },
  },
  safelist: ["i-mdi-image", "h-16"],
});
