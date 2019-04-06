const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const isProd = (process.env.NODE_ENV === 'production')

module.exports = {
  mode: 'universal',
  head: {
    title: 'LILD',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Dream sharing SNS.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Material+Icons'
      }
    ]
  },
  loading: { color: '#fff' },
  css: ['~/assets/style/app.styl'],
  plugins: ['@/plugins/vuetify', '@/plugins/axios'],
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa'],
  axios: {
    proxy: true
  },
  proxy: {
    '/v1': (isProd ? 'https://api.lild.app' : 'http://localhost:4000')
  },
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
