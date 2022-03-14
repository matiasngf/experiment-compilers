module.exports = {
  root: true,
  extends: ['@webpack-contrib/eslint-config-webpack', 'prettier'],
  rules: {
    "no-console": "off",
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
  }
};