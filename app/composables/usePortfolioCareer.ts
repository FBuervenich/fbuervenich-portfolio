import { computed } from '#imports';
import type { ComputedRef } from 'vue';
import type { PortfolioCareerStep } from '../../shared/types';

type UsePortfolioCareerResult = {
  data: ComputedRef<PortfolioCareerStep[]>;
};

export const usePortfolioCareer = async () => {
  const asyncData = await useAsyncData<PortfolioCareerStep[]>(
    'portfolio-career',
    () => $fetch<PortfolioCareerStep[]>('/api/portfolio/career')
  );

  return {
    ...asyncData,
    data: computed<PortfolioCareerStep[]>(() => asyncData.data.value ?? []),
  } as typeof asyncData & UsePortfolioCareerResult;
};
