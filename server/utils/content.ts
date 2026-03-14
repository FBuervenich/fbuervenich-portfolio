import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

const markdown = new MarkdownIt({ html: true, linkify: true, typographer: true });

export interface BlogPost {
  id: string;
  title: string;
  path: string;
  date: string;
  summary: string;
  tags: string[];
  content: string;
  timeToRead: number;
}

export interface DocPage {
  id: string;
  slug: string;
  path: string;
  title: string;
  excerpt: string;
  content: string;
}

function estimateTimeToRead(markdownSource: string): number {
  const text = markdownSource
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/[#>*_\-\[\]()!]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!text) {
    return 1;
  }

  const words = text.split(' ').length;
  return Math.max(1, Math.ceil(words / 200));
}

function normalizeBlogPath(pathValue: string, fileSlug: string): string {
  if (!pathValue) {
    return `/${fileSlug}`;
  }

  return pathValue.startsWith('/') ? pathValue : `/${pathValue}`;
}

function formatDate(dateValue: string): string {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

function getIdFromFileName(fileName: string): string {
  return fileName.replace(/\.md$/, '');
}

async function readMarkdownFiles(directory: string): Promise<Array<{ fileName: string; source: string }>> {
  const fileNames = (await readdir(directory)).filter((fileName) => fileName.endsWith('.md'));

  return Promise.all(
    fileNames.map(async (fileName) => ({
      fileName,
      source: await readFile(resolve(directory, fileName), 'utf8'),
    })),
  );
}

let blogCache: BlogPost[] | null = null;
let docsCache: DocPage[] | null = null;

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (blogCache) {
    return blogCache;
  }

  const rootDir = process.cwd();
  const directory = resolve(rootDir, 'blog');
  const files = await readMarkdownFiles(directory);

  const posts = files
    .map(({ fileName, source }) => {
      const id = getIdFromFileName(fileName);
      const parsed = matter(source);
      const frontmatter = parsed.data as Record<string, unknown>;
      const path = normalizeBlogPath((frontmatter.path as string) || '', id);
      const date = (frontmatter.date as string) || '';

      return {
        id,
        title: (frontmatter.title as string) || id,
        path,
        date,
        summary: (frontmatter.summary as string) || '',
        tags: Array.isArray(frontmatter.tags)
          ? frontmatter.tags.map((tag) => String(tag))
          : [],
        content: markdown.render(parsed.content),
        timeToRead: estimateTimeToRead(parsed.content),
      } as BlogPost;
    })
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

  blogCache = posts;
  return posts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.path.replace(/^\//, '') === slug) || null;
}

export async function getTaggedPosts(tag: string): Promise<BlogPost[]> {
  const normalizedTag = tag.toLowerCase();
  const posts = await getBlogPosts();
  return posts.filter((post) => post.tags.some((postTag) => postTag.toLowerCase() === normalizedTag));
}

export async function getDocs(): Promise<DocPage[]> {
  if (docsCache) {
    return docsCache;
  }

  const rootDir = process.cwd();
  const directory = resolve(rootDir, 'docs');
  const files = await readMarkdownFiles(directory);

  const docs = files.map(({ fileName, source }) => {
    const id = getIdFromFileName(fileName);
    const parsed = matter(source);
    const frontmatter = parsed.data as Record<string, unknown>;

    return {
      id,
      slug: id,
      path: `/docs/${id}`,
      title: (frontmatter.title as string) || id,
      excerpt: (frontmatter.excerpt as string) || '',
      content: markdown.render(parsed.content),
    } as DocPage;
  });

  docsCache = docs;
  return docs;
}

export async function getDocBySlug(slug: string): Promise<DocPage | null> {
  const docs = await getDocs();
  return docs.find((doc) => doc.slug === slug) || null;
}

export function paginate<T>(items: T[], page: number, perPage: number) {
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const totalCount = items.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / perPage));
  const currentPage = Math.min(safePage, totalPages);
  const start = (currentPage - 1) * perPage;
  const pagedItems = items.slice(start, start + perPage);

  return {
    totalCount,
    pageInfo: {
      totalPages,
      currentPage,
    },
    items: pagedItems,
  };
}

export function formatBlogDate(input: string): string {
  return formatDate(input);
}
