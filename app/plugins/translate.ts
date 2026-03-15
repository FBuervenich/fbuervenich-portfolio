import type { LocalizedString } from '../../shared/types';

type TranslateFn = (text?: LocalizedString) => string;
type I18nLike = {
  locale?: {
    value?: string;
  };
};

export default defineNuxtPlugin<{ translate: TranslateFn }>(nuxtApp => {
  const translate: TranslateFn = text => {
    if (!text) {
      return '';
    }

    const locale =
      (nuxtApp.$i18n as I18nLike | undefined)?.locale?.value ?? 'en';

    return text[locale] ?? text.en ?? '';
  };

  nuxtApp.vueApp.config.globalProperties.$translate = translate;

  return {
    provide: {
      translate,
    },
  };
});
