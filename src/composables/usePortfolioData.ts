interface PortfolioData {
  career: Record<string, unknown>[];
  education: Record<string, unknown>[];
  knowledge: Record<string, unknown>[];
  projects: Record<string, unknown>[];
  qualification: Record<string, unknown>[];
  personal: Record<string, unknown>;
}

const EMPTY_DATA: PortfolioData = {
  career: [],
  education: [],
  knowledge: [],
  projects: [],
  qualification: [],
  personal: {},
};

export const usePortfolioData = () => {
  return useAsyncData<PortfolioData>('portfolio-data', () => $fetch<PortfolioData>('/api/portfolio'), {
    default: () => EMPTY_DATA,
  });
};
