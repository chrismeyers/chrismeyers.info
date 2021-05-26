module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['react-app', 'react-app/jest', 'plugin:prettier/recommended'],
  rules: {
    'no-console': 'warn',
    'prefer-const': 'warn',
    'import/no-anonymous-default-export': 'off',
  },
};
