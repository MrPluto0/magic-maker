/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  globals: {
    require: true,
  },
  ignorePatterns: [
    ".eslintrc.cjs",
    "postcss.config.js",
    "tailwind.config.js",
    "public/",
    "auto-imports.d.ts",
    "components.d.ts",
  ],
  rules: {
    "vue/multi-word-component-names": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "vue/max-attributes-per-line": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "prefer-const": 1,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-require-imports": 0,
    "@typescript-eslint/no-unused-expressions": 0,
    "no-undef": 0,
    "prefer-const": 0,
    "@typescript-eslint/no-unsafe-function-type":0,
    // "max-len": ["error", {"code":100}]
    // "vue/max-len": ["error", {
    //   "code": 100,
    // }]
  },
};
