import { createError, getQuery } from 'h3';
import { formatBlogDate, getTaggedPosts, paginate } from '../../utils/content';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing tag id' });
  }

  const query = getQuery(event);
  const page = Number.parseInt(String(query.page || '1'), 10);
  const perPage = Number.parseInt(String(query.perPage || '3'), 10);

  const taggedPosts = await getTaggedPosts(decodeURIComponent(id));
  const paginated = paginate(taggedPosts, page, perPage);

  return {
    tag: decodeURIComponent(id),
    ...paginated,
    items: paginated.items.map((post) => ({
      ...post,
      date: formatBlogDate(post.date),
    })),
  };
});
