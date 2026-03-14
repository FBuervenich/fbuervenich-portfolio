export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  srcDir: 'src/',
  dir: {
    public: '../public',
  },
  modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss', '@nuxtjs/sitemap'],
  css: ['~/css/main.css', '~/css/github-markdown.css'],
  runtimeConfig: {
    dataBaseUrl: process.env.DATA_BASE_URL,
    authToken: process.env.AUTH_TOKEN,
    public: {
      siteUrl: 'https://home.fbuervenich.de',
    },
  },
  app: {
    head: {
      meta: [
        {
          name: 'keywords',
          content:
            'web,developer,full stack,Nuxt,Vue,Tailwind,Tailwind CSS,JavaScript,HTML,CSS,Vue.js,VueJS',
        },
        {
          name: 'description',
          content: 'Florentin Buervenich - Full-stack web developer',
        },
        {
          name: 'author',
          content: 'Florentin Buervenich',
        },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Nunito+Sans:400,700',
        },
      ],
    },
  },
  site: {
    url: 'https://home.fbuervenich.de',
  },
  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix',
    detectBrowserLanguage: false,
    langDir: 'locales',
    bundle: {
      optimizeTranslationDirective: false,
    },
    compilation: {
      strictMessage: false,
    },
    locales: [
      { code: 'de', language: 'de-DE', file: 'de.json', name: 'Deutsch' },
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
    ],
  },
  sitemap: {},
  nitro: {
    prerender: {
      routes: ['/rss.xml'],
    },
  },
});
