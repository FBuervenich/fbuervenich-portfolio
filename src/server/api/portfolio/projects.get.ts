import { createError } from 'h3';
import { readProjectsCache } from '../../utils/portfolio-cache';

export default defineEventHandler(async () => {
  try {
    return await readProjectsCache();
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing build-time cache (.cache/projects.json). Run yarn prepare:data.',
    });
  }
});
