import { createError } from 'h3';
import { readCareerCache } from '../../utils/portfolio-cache';

export default defineEventHandler(async () => {
  try {
    return await readCareerCache();
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage:
        'Missing build-time cache (.cache/career.json). Run yarn prepare:data.',
    });
  }
});
