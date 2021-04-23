module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'linebreak-style': ['error', 'windows'],
    'comma-dangle': 'off',
    strict: 'off',
    'arrow-body-style': 'off'
  },
};
