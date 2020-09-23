module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: "airbnb-base",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    indent: ["error", 4],
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-underscore-dangle": "off",
    "no-undef": "off",
    "no-param-reassign": "off",
    "class-methods-use-this": "off",
  },
};
