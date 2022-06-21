const glob = require('glob');
const fs = require('fs');

module.exports = {
  root: true,
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'prettier',
    'jest',
    'jest-dom',
    'testing-library',
    'eslint-comments',
    'import',
  ],
  env: {
    browser: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    'max-lines': ['error', { max: 1_000, skipComments: true }],
    'max-lines-per-function': ['error', { max: 500, skipComments: true }],
    'complexity': ['warn', { max: 20 }],
    'curly': ['error', 'all'],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/function-component-definition': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['a'],
      },
    ],
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['state'] },
    ],
    'testing-library/prefer-screen-queries': 'off',
    'testing-library/await-async-query': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'eslint-comments/no-unlimited-disable': 'error',
    'eslint-comments/no-unused-disable': 1,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*{.,_}{test,spec,cypress,stories}.{js,jsx,ts,tsx}',
          '**/jest.config.js',
          '**/jest.setup.js',
          '**/.eslintrc.js',
        ],
        optionalDependencies: false,
      },
    ],
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external', 'internal']],
      },
    ],
  },
};
