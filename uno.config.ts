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
      // RunwayML 风格设计令牌：电影级暗黑、冷灰中性
      // Surface: #030303(底) / #1a1a1a(卡片) · Border: #27272a · 文本: #fff/#767d88/#a7a7a7
      night: {
        DEFAULT: "#030303",
        light: "#1a1a1a",
        lighter: "#111113",
      },
      primary: {
        DEFAULT: "#ffffff",
        light: "#c9ccd1",
      },
    },
  },
  safelist: ["i-mdi-image", "h-16", "h-12"],
});
