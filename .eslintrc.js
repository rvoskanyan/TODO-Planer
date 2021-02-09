module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-unused-expressions': ['error', { allowTernary: true, allowShortCircuit: true }],
    'newline-after-var': [
      'error',
      'always',
    ],
    'no-console': ['warn', { allow: ['info', 'error'] }],
    curly: ['error', 'all'],
    'newline-before-return': 'warn',
  },
};
