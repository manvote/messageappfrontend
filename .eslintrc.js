module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react',
    'react-native',
    'react-hooks',
    'prettier',
  ],
  extends: [
    '@react-native-community',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  env: {
    'react-native/react-native': true,
  },
  rules: {
    // Prettier
    'prettier/prettier': 'error',

    // React
    'react/react-in-jsx-scope': 'off',

    // TS
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',

    // React Native
    'react-native/no-inline-styles': 'warn',

    // Hooks
    'react-hooks/exhaustive-deps': 'warn',
  },
};
