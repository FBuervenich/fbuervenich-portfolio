import { createError } from 'h3';
import { readPersonalCache } from '../../utils/portfolio-cache';

export default defineEventHandler(async () => {
  try {
    return await readPersonalCache();
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage:
        'Missing build-time cache (.cache/personal.json). Run yarn prepare:data.',
    });
  }
});
