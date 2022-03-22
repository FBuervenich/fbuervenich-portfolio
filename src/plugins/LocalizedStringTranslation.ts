import _Vue from 'vue';
import { LocalizedString } from '@/types';

let CURRENT_LOCALE = 'en';
export function setLocale(locale: string) {
  CURRENT_LOCALE = locale;
}

function translate(text: LocalizedString) {
  return text[CURRENT_LOCALE] ?? text.en;
}

export function LocalizedStringTranslationPlugin(
  Vue: typeof _Vue,
  options?: any
): void {
  Vue.prototype.$translate = translate;
}
