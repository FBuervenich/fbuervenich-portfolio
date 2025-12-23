// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import posthog from 'posthog-js';
import VueScrollTo from 'vue-scrollto';
import 'vue-router';

import { ClientApiConstructor } from './types';

import DefaultLayout from './layouts/Default.vue';
import { LocalizedStringTranslationPlugin } from '@/plugins/LocalizedStringTranslation';

const client: ClientApiConstructor = (Vue, { router, head, appOptions }) => {
  // load localization files here so the hot reload works properly
  appOptions.i18n.setLocaleMessage('de', require('./locales/de.json'));
  appOptions.i18n.setLocaleMessage('en', require('./locales/en.json'));

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);

  Vue.use(LocalizedStringTranslationPlugin);

  Vue.use(VueScrollTo, {
    duration: 500,
    easing: 'ease',
  });

  head.meta?.push({
    name: 'keywords',
    content:
      'web,developer,full stack,Gridsome,Vue,Tailwind,Tailwind CSS,JavaScript,HTML,CSS,Vue.js,VueJS',
  });

  head.meta?.push({
    name: 'description',
    content: 'Florentin Buervenich - Full-stack web developer',
  });

  head.meta?.push({
    name: 'author',
    content: 'Florentin Buervenich',
  });

  head.link?.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Nunito+Sans:400,700',
  });

  if (process?.isClient) {
    const isRealEnvironment =
      process.env.NODE_ENV === 'production' &&
      typeof window !== 'undefined' &&
      !['localhost', '127.0.0.1'].includes(window.location.hostname);

    if (isRealEnvironment) {
      posthog.init('phc_1ZwaRLmq6WjoB8YHn7gzmMFwzuJIG8grQ4tYsKHzScf', {
        api_host: 'https://eu.i.posthog.com',
        autocapture: true,
        capture_pageview: false,
      });

      router.afterEach(to => {
        posthog.capture('$pageview', {
          $current_url: to.fullPath,
        });
      });
    }
  }
};

export default client;
