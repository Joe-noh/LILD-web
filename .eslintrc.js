module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: ['@nuxtjs'],
  plugins: [],
  rules: {
    'no-console': 1,
    'vue/max-attributes-per-line': 0
  },
}
