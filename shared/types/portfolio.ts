import type { LocalizedString } from './types';

export interface PortfolioPersonal {
  firstName?: string;
  lastName?: string;
  publicEmail?: string;
  linkedinUrl?: string;
  xingUrl?: string;
  githubUrl?: string;
}

export interface PortfolioProject {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  projectUrl?: string;
  projectUrlDescription?: LocalizedString;
  technologies?: LocalizedString[];
}

export interface PortfolioCareerStep {
  id: string;
  position: LocalizedString;
  company: LocalizedString;
  startDate: string;
  endDate: string;
  technologies?: LocalizedString[];
  content?: LocalizedString[];
}
