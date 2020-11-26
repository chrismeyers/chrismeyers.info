module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  rules: {
    'no-console': 'warn',
    'prefer-const': 'error',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
