import { getQuery } from 'h3';
import { formatBlogDate, getBlogPosts, paginate } from '../utils/content';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const page = Number.parseInt(String(query.page || '1'), 10);
  const perPage = Number.parseInt(String(query.perPage || '3'), 10);

  const posts = await getBlogPosts();
  const paginated = paginate(posts, page, perPage);

  return {
    ...paginated,
    items: paginated.items.map((post) => ({
      ...post,
      date: formatBlogDate(post.date),
    })),
  };
});
