import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createError } from 'h3';
import { enrichAllWithLocalizationKeys } from '../utils/localization';

let portfolioCache: Record<string, unknown> | null = null;

export default defineEventHandler(async () => {
  if (portfolioCache) {
    return portfolioCache;
  }

  const rootDir = process.cwd();
  const filePath = resolve(rootDir, 'src/data/portfolio.json');
  const raw = await readFile(filePath, 'utf8');

  let data: Record<string, unknown>;
  try {
    data = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    throw createError({ statusCode: 500, statusMessage: 'Failed to parse portfolio data' });
  }

  enrichAllWithLocalizationKeys(data);

  portfolioCache = data;
  return data;
});
