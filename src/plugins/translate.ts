import type { LocalizedString } from '~/types';

export default defineNuxtPlugin((nuxtApp) => {
  const translate = (text?: LocalizedString) => {
    if (!text) {
      return '';
    }

    const locale = nuxtApp.$i18n?.locale?.value || 'en';
    return text[locale] ?? text.en ?? '';
  };

  nuxtApp.vueApp.config.globalProperties.$translate = translate;

  return {
    provide: {
      translate,
    },
  };
});
