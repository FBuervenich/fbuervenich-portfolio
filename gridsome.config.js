// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const SITE_URL = 'https://home.fbuervenich.de';
const LOCALES = [
  // locales list
  'de',
  'en',
];

module.exports = {
  siteName: 'Florentin Bürvenich',
  siteDescription:
    'My portfolio website (powered by Gridsome & Tailwind CSS v1)',
  siteUrl: SITE_URL,
  plugins: [
    {
      use: 'gridsome-plugin-typescript',
    },
    {
      use: 'gridsome-plugin-i18n',
      options: {
        locales: LOCALES,
        pathAliases: {
          // path segment alias for each locales
          de: 'de',
          en: 'en',
        },
        fallbackLocale: 'en', // fallback language
        defaultLocale: 'en', // default language
        enablePathRewrite: true, // rewrite path with locale prefix, default: true
        rewriteDefaultLanguage: true, // rewrite default locale, default: true
        messages: {
          // 'de': require('./src/locales/de.json'),
          // 'en': require('./src/locales/en.json'),
        },
      },
    },
    {
      use: 'gridsome-plugin-tailwindcss',
    },
    {
      use: '@gridsome/vue-remark',
      options: {
        typeName: 'Documentation', // Required
        baseDir: './docs', // Where .md files are located
        pathPrefix: '/docs', // Add route prefix. Optional
        template: './src/templates/Documentation.vue', // Optional
        plugins: [
          [
            'gridsome-plugin-remark-shiki',
            { theme: 'Material-Theme-Palenight', skipInline: true },
          ],
        ],
      },
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'blog/**/*.md',
        typeName: 'Post',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true,
          },
        },
      },
    },
    {
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'Post',
        feedOptions: {
          title: 'Florentin Buervenich - Blog',
          feed_url: `${SITE_URL}/rss.xml`,
          site_url: `${SITE_URL}`,
        },
        feedItemOptions: node => ({
          title: node.title,
          description: node.summary,
          url: SITE_URL + node.path,
          author: 'Florentin Bürvenich',
          date: node.date,
        }),
        output: {
          dir: './static',
          name: 'rss.xml',
        },
      },
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000, // default
      },
    },
  ],
  templates: {
    Tag: '/tag/:id',
  },
  transformers: {
    remark: {
      plugins: [
        [
          'gridsome-plugin-remark-shiki',
          { theme: 'Material-Theme-Palenight', skipInline: true },
        ],
      ],
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
    },
  },
};
