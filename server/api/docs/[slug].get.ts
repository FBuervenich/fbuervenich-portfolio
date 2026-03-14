import { createError } from 'h3';
import { getDocBySlug } from '../../utils/content';

export default defineEventHandler(async (event) => {
  const slug = event.context.params?.slug;

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing docs slug' });
  }

  const doc = await getDocBySlug(slug);

  if (!doc) {
    throw createError({ statusCode: 404, statusMessage: 'Documentation page not found' });
  }

  return doc;
});
