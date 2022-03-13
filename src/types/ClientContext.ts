import VueRouter from 'vue-router';
import { MetaInfo } from 'vue-meta';
import { IVueI18n } from 'vue-i18n';

export interface ClientContext {
  appOptions: {
    i18n: IVueI18n;
    [x: string]: unknown;
  };
  router: VueRouter;
  head: MetaInfo;
}
