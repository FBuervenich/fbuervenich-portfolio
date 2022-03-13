// DO NOT REMOVE THIS !!!
// (otherwise, the Vue-type is not inferred correctly anymore)
import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $tp: (path: string, locale: string, force: boolean) => string;
  }
}
