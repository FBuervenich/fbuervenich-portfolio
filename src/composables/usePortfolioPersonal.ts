import { computed } from '#imports';
import type { ComputedRef } from 'vue';
import type { PortfolioPersonal } from '../types';

type UsePortfolioPersonalResult = {
  data: ComputedRef<PortfolioPersonal>;
};

export const usePortfolioPersonal = async () => {
  const asyncData = await useAsyncData<PortfolioPersonal>(
    'portfolio-personal',
    () => $fetch<PortfolioPersonal>('/api/portfolio/personal'),
  );

  return {
    ...asyncData,
    data: computed<PortfolioPersonal>(() => asyncData.data.value ?? {}),
  } as typeof asyncData & UsePortfolioPersonalResult;
};
