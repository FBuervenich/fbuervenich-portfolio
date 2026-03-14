module.exports = {
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
    extraFileExtensions: ['.vue'],
  },
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    'eslint-plugin-prettier/recommended',
  ],
  rules: {
    'no-undef': 'off',
  },
  overrides: [
    {
      files: ['src/pages/**/*.vue', 'src/layouts/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },
  ],
};
