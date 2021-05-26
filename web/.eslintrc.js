module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['react-app', 'react-app/jest', 'plugin:prettier/recommended'],
  rules: {
    'no-console': 'warn',
    'prefer-const': 'warn',
    semi: 'warn',
    quotes: ['warn', 'single'],
    'comma-dangle': ['warn', 'always-multiline'],
    'import/no-anonymous-default-export': 'off',
  },
};
