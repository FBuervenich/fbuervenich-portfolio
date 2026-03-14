export const usePortfolioPersonal = () =>
  useAsyncData<Record<string, unknown>>('portfolio-personal', () =>
    $fetch<Record<string, unknown>>('/api/portfolio/personal'),
  );
