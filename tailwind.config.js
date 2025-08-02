const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,ts,tsx}"],
  theme: {
    minHeight: {
      8: "2rem",
      600: "600px",
      full: "100%",
    },
    extend: {
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
      cursor: {
        "r-resize": "row-resize",
        "c-resize": "col-resize",
        grab: "grab",
      },
      lineHeight: {
        16: "4rem",
        12: "3rem",
      },
      minWidth: {
        1256: "1256px",
      },
      spacing: {
        100: "25rem",
        24: "6rem",
        34: "8.5rem",
        22: "5.5rem",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant, e, postcss }) {
      addVariant("firefox", ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: "-moz-document",
          params: "url-prefix()",
        });
        isFirefoxRule.append(container.nodes);
        container.append(isFirefoxRule);
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(
            `firefox${separator}${rule.selector.slice(1)}`
          )}`;
        });
      });
    }),
  ],
};
