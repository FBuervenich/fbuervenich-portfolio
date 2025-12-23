// DO NOT REMOVE THIS !!!
// (otherwise, the Vue-type is not inferred correctly anymore)
import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $static: { [x: string]: any };
    $page: { [x: string]: any };
  }
}

declare global {
  namespace NodeJS {
    interface Process {
      isClient?: boolean;
    }
  }
}

export {};
