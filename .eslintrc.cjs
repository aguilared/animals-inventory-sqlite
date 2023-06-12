module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "react/display-name": "off",
  },
  extends: "next/core-web-vitals",
};
