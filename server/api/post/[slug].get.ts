import { createError } from 'h3';
import { formatBlogDate, getBlogPostBySlug } from '../../utils/content';

export default defineEventHandler(async (event) => {
  const slug = event.context.params?.slug;

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug parameter' });
  }

  const post = await getBlogPostBySlug(slug);

  if (!post) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found' });
  }

  return {
    ...post,
    date: formatBlogDate(post.date),
  };
});
