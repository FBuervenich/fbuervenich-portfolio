import type { LocalizedString } from '../types';

type TranslateFn = (text?: LocalizedString) => string;

export default defineNuxtPlugin<{ translate: TranslateFn }>((nuxtApp) => {
  const translate: TranslateFn = (text) => {
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
