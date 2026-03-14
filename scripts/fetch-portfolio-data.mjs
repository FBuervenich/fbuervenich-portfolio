import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import dotenv from 'dotenv';

dotenv.config();

const LOCALES = ['de', 'en'];
const DATA_FILES = [
  { fileName: 'career.json', key: 'career' },
  { fileName: 'education.json', key: 'education' },
  { fileName: 'knowledge.json', key: 'knowledge' },
  { fileName: 'projects.json', key: 'projects' },
  { fileName: 'qualification.json', key: 'qualification' },
];

const publicOutputFile = resolve(process.cwd(), 'public/data/portfolio.json');
const sourceOutputFile = resolve(process.cwd(), 'src/data/portfolio.json');
const baseUrl = process.env.DATA_BASE_URL;
const authToken = process.env.AUTH_TOKEN;

function isLocalizedString(val) {
  if (!val || typeof val !== 'object') {
    return false;
  }

  const entries = Object.entries(val);

  return (
    entries.length > 0 &&
    Boolean(val.en) &&
    entries.every(([key, value]) => key.length === 2 && typeof value === 'string')
  );
}

function enrichWithLocalizationKeys(val) {
  for (const locale of LOCALES) {
    if (!val[locale]) {
      val[locale] = val.en;
    }
  }
}

function enrichAllWithLocalizationKeys(object) {
  if (!object || typeof object !== 'object') {
    return;
  }

  Object.values(object).forEach((value) => {
    if (!value || typeof value !== 'object') {
      return;
    }

    if (isLocalizedString(value)) {
      enrichWithLocalizationKeys(value);
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (isLocalizedString(item)) {
          enrichWithLocalizationKeys(item);
        } else {
          enrichAllWithLocalizationKeys(item);
        }
      });
      return;
    }

    enrichAllWithLocalizationKeys(value);
  });
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: authToken ? { 'x-auth-token': authToken } : undefined,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function readExistingFallback() {
  if (!existsSync(publicOutputFile) && !existsSync(sourceOutputFile)) {
    return null;
  }

  const file = existsSync(publicOutputFile) ? publicOutputFile : sourceOutputFile;
  const raw = await readFile(file, 'utf8');
  return JSON.parse(raw);
}

async function run() {
  await mkdir(resolve(process.cwd(), 'public/data'), { recursive: true });
  await mkdir(resolve(process.cwd(), 'src/data'), { recursive: true });

  const fallbackData = await readExistingFallback();

  if (!baseUrl) {
    if (fallbackData) {
      console.warn('DATA_BASE_URL missing. Reusing existing public/data/portfolio.json.');
      return;
    }

    throw new Error('DATA_BASE_URL is required to generate static portfolio data.');
  }

  try {
    const result = {
      career: [],
      education: [],
      knowledge: [],
      projects: [],
      qualification: [],
      personal: {},
    };

    for (const { fileName, key } of DATA_FILES) {
      const data = await fetchJson(`${baseUrl}${fileName}`);
      data.reverse().forEach((item) => {
        enrichAllWithLocalizationKeys(item);
      });
      result[key] = data;
    }

    const personalData = await fetchJson(`${baseUrl}personal.json`);
    enrichAllWithLocalizationKeys(personalData);
    result.personal = personalData;

    const payload = JSON.stringify(result, null, 2);
    await writeFile(publicOutputFile, payload);
    await writeFile(sourceOutputFile, payload);
    console.info('Generated static data files: public/data/portfolio.json and src/data/portfolio.json');
  } catch (error) {
    if (fallbackData) {
      console.warn('Could not refresh portfolio data. Reusing existing public/data/portfolio.json.');
      console.warn(error instanceof Error ? error.message : String(error));
      return;
    }

    throw error;
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
