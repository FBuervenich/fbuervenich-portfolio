import { computed } from '#imports';
import type { ComputedRef } from 'vue';
import type { PortfolioProject } from '../types';

type UsePortfolioProjectsResult = {
  data: ComputedRef<PortfolioProject[]>;
};

export const usePortfolioProjects = async () => {
  const asyncData = await useAsyncData<PortfolioProject[]>(
    'portfolio-projects',
    () =>
      $fetch<PortfolioProject[]>('/api/portfolio/projects'),
  );

  return {
    ...asyncData,
    data: computed<PortfolioProject[]>(() => asyncData.data.value ?? []),
  } as typeof asyncData & UsePortfolioProjectsResult;
};
