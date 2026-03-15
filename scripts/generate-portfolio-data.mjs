import { mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const LOCALES = ['de', 'en'];
const CACHE_PERSONAL_FILE = resolve(process.cwd(), '.cache/personal.json');
const CACHE_PROJECTS_FILE = resolve(process.cwd(), '.cache/projects.json');
const CACHE_CAREER_FILE = resolve(process.cwd(), '.cache/career.json');
const baseUrl = process.env.DATA_BASE_URL;
const authToken = process.env.AUTH_TOKEN;

if (!baseUrl) {
  throw new Error('DATA_BASE_URL is required for build-time data generation.');
}

function isLocalizedString(value) {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const entries = Object.entries(value);
  return entries.length > 0 && typeof value.en === 'string';
}

function enrichLocalizedObject(value) {
  for (const locale of LOCALES) {
    if (!value[locale]) {
      value[locale] = value.en;
    }
  }
}

function enrichAllLocalizedValues(input) {
  if (!input || typeof input !== 'object') {
    return;
  }

  if (Array.isArray(input)) {
    input.forEach(item => enrichAllLocalizedValues(item));
    return;
  }

  if (isLocalizedString(input)) {
    enrichLocalizedObject(input);
    return;
  }

  Object.values(input).forEach(value => enrichAllLocalizedValues(value));
}

async function fetchJson(fileName) {
  const response = await fetch(`${baseUrl}${fileName}`, {
    headers: authToken ? { 'x-auth-token': authToken } : undefined,
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${fileName}: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

async function run() {
  const [personal, projects, career] = await Promise.all([
    fetchJson('personal.json'),
    fetchJson('projects.json'),
    fetchJson('career.json'),
  ]);

  enrichAllLocalizedValues(personal);
  enrichAllLocalizedValues(projects);
  enrichAllLocalizedValues(career);

  const personalMinimal = {
    firstName: personal.firstName,
    lastName: personal.lastName,
    publicEmail: personal.publicEmail,
    linkedinUrl: personal.linkedinUrl,
    xingUrl: personal.xingUrl,
    githubUrl: personal.githubUrl,
  };

  const projectsMinimal = projects.map(project => ({
    id: project.id,
    name: project.name,
    description: project.description,
    projectUrl: project.projectUrl,
    projectUrlDescription: project.projectUrlDescription,
    technologies: project.technologies,
  }));

  const careerMinimal = career.map(step => ({
    id: step.id,
    position: step.position,
    company: step.company,
    startDate: step.startDate,
    endDate: step.endDate,
    technologies: step.technologies,
    content: step.content,
  }));

  await mkdir(resolve(process.cwd(), '.cache'), { recursive: true });
  await writeFile(
    CACHE_PERSONAL_FILE,
    JSON.stringify(personalMinimal, null, 2)
  );
  await writeFile(
    CACHE_PROJECTS_FILE,
    JSON.stringify(projectsMinimal, null, 2)
  );
  await writeFile(CACHE_CAREER_FILE, JSON.stringify(careerMinimal, null, 2));

  console.info(
    'Generated build-time portfolio cache in .cache/{personal,projects,career}.json'
  );
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});
