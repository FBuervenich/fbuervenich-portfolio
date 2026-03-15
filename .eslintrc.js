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
  ],
  rules: {
    'no-undef': 'off',
    'prettier/prettier': 'warn',
  },
  overrides: [
    {
      files: ['app/pages/**/*.vue', 'app/layouts/**/*.vue', 'app/error.vue'],
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },
    {
      files: ['app/components/Layout.vue'],
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },
  ],
};
