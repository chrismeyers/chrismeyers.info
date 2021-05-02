module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['react-app', 'react-app/jest'],
  rules: {
    'no-console': 'warn',
    'prefer-const': 'error',
    semi: 'warn',
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
  },
};
