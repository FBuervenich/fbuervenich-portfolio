export const usePortfolioProjects = () =>
  useAsyncData<Record<string, unknown>[]>('portfolio-projects', () =>
    $fetch<Record<string, unknown>[]>('/api/portfolio/projects'),
  );
