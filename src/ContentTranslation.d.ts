declare module 'vue/types/vue' {
  interface Vue {
    $tp: (path: string, locale: string, force: boolean) => string;
  }
}
