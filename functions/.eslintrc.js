module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'google'],
  rules: {
    quotes: [2, 'single'],
    indent: [1, 2],
  },
  parserOptions: {
    // Required for certain syntax usages
    ecmaVersion: 2019,
    sourceType: 'module',
  },
};
