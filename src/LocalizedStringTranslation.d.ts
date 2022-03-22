import { LocalizedString } from '@/types';

declare module 'vue/types/vue' {
  interface Vue {
    $translate: (text: LocalizedString) => string;
  }
}
