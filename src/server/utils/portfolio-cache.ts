import { readFile } from 'fs/promises';
import { resolve } from 'path';
import type {
  PortfolioCareerStep,
  PortfolioPersonal,
  PortfolioProject,
} from '../../types';

async function readJson<T>(fileName: string): Promise<T> {
  const raw = await readFile(resolve(process.cwd(), '.cache', fileName), 'utf8');
  return JSON.parse(raw) as T;
}

export async function readPersonalCache() {
  const personalData = await readJson<PortfolioPersonal>('personal.json');
  return {
    firstName: personalData.firstName,
    lastName: personalData.lastName,
    publicEmail: personalData.publicEmail,
    linkedinUrl: personalData.linkedinUrl,
    xingUrl: personalData.xingUrl,
    githubUrl: personalData.githubUrl,
  };
}

export async function readProjectsCache() {
  const projectsData = await readJson<PortfolioProject[]>('projects.json');
  return projectsData.map((project) => ({
    id: project.id,
    name: project.name,
    description: project.description,
    projectUrl: project.projectUrl,
    projectUrlDescription: project.projectUrlDescription,
    technologies: project.technologies,
  }));
}

export async function readCareerCache() {
  const careerData = await readJson<PortfolioCareerStep[]>('career.json');
  return careerData.map((step) => ({
    id: step.id,
    position: step.position,
    company: step.company,
    startDate: step.startDate,
    endDate: step.endDate,
    technologies: step.technologies,
    content: step.content,
  }));
}
