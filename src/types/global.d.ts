import { LocalizedString } from './types';

declare module 'vue' {
  interface ComponentCustomProperties {
    $translate: (text?: LocalizedString) => string;
  }
}

declare module '#app' {
  interface NuxtApp {
    $translate: (text?: LocalizedString) => string;
  }
}

export {};
