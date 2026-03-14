import portfolioData from '~/data/portfolio.json';

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

const STATIC_PORTFOLIO_DATA = portfolioData as PortfolioData;

export const usePortfolioData = () => {
  return useAsyncData<PortfolioData>('portfolio-data', () => Promise.resolve(STATIC_PORTFOLIO_DATA), {
    default: () => EMPTY_DATA,
  });
};
