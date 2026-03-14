import { getBlogPosts } from '../utils/content';

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export default defineEventHandler(async () => {
  const posts = await getBlogPosts();
  const siteUrl = 'https://home.fbuervenich.de';

  const items = posts
    .map((post) => {
      const link = `${siteUrl}${post.path}`;
      return [
        '<item>',
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${escapeXml(link)}</link>`,
        `<guid>${escapeXml(link)}</guid>`,
        `<description>${escapeXml(post.summary)}</description>`,
        `<pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        '</item>',
      ].join('');
    })
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>Florentin Buervenich - Blog</title>\n    <link>${siteUrl}</link>\n    <description>Blog feed</description>\n    ${items}\n  </channel>\n</rss>`;

  return new Response(rss, {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
    },
  });
});
