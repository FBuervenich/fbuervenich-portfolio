<template>
  <Layout>
    <div class="container-inner mx-auto my-16">
      <h2 class="text-4xl font-bold mb-8 border-b">Tag: {{ tag }}</h2>

      <div v-for="post in posts" :key="post.id" class="post border-gray-400 border-b mb-12">
        <h2 class="text-3xl font-bold">
          <g-link :to="localePath(post.path)" class="text-copy-primary">{{ post.title }}</g-link>
        </h2>
        <div class="text-copy-secondary mb-4">
          <span>{{ post.date }}</span>
          <span> &middot; </span>
          <span>{{ post.timeToRead }} min read</span>
        </div>

        <div class="text-lg mb-4">{{ post.summary }}</div>

        <div class="mb-8">
          <g-link :to="localePath(post.path)" class="font-bold uppercase">Read More</g-link>
        </div>
      </div>

      <pagination-posts
        v-if="pageInfo.totalPages > 1"
        :base="localePath(`/tag/${encodedTag}`)"
        :total-pages="pageInfo.totalPages"
        :current-page="pageInfo.currentPage"
      />
    </div>
  </Layout>
</template>

<script setup lang="ts">
interface BlogPostItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  timeToRead: number;
  path: string;
}

interface TagApiResponse {
  tag: string;
  items: BlogPostItem[];
  pageInfo: {
    totalPages: number;
    currentPage: number;
  };
}

const route = useRoute();
const localePath = useLocalePath();

const encodedTag = computed(() => String(route.params.id || ''));
const currentPage = computed(() => Number.parseInt(String(route.params.page || '1'), 10));

const { data } = await useAsyncData<TagApiResponse>(
  () => `tag-${encodedTag.value}-${currentPage.value}`,
  () =>
    $fetch(`/api/tag/${encodedTag.value}`, {
      query: {
        page: currentPage.value,
        perPage: 3,
      },
    }),
);

const tag = computed(() => data.value?.tag || decodeURIComponent(encodedTag.value));
const posts = computed(() => data.value?.items || []);
const pageInfo = computed(() =>
  data.value?.pageInfo || { totalPages: 1, currentPage: currentPage.value },
);

useHead({ title: `Tag: ${tag.value}` });
</script>
