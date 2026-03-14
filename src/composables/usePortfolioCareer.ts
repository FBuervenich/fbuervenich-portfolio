export const usePortfolioCareer = () =>
  useAsyncData<Record<string, unknown>[]>('portfolio-career', () =>
    $fetch<Record<string, unknown>[]>('/api/portfolio/career')
  );
