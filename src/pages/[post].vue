<template>
  <Layout>
    <div class="container-inner mx-auto my-16">
      <h1 class="text-4xl font-bold leading-tight">{{ post?.title }}</h1>
      <div class="text-xl text-gray-600 mb-4">{{ post?.date }}</div>
      <div class="flex mb-8 text-sm">
        <g-link
          v-for="tag in post?.tags || []"
          :key="tag"
          :to="localePath(`/tag/${encodeURIComponent(tag)}`)"
          class="bg-gray-300 rounded-full px-4 py-2 mr-4 hover:bg-green-300"
        >
          {{ tag }}
        </g-link>
      </div>
      <div class="markdown-body mb-8" v-html="post?.content" />
      <div class="mb-8">
        <g-link :to="localePath('/blog')" class="font-bold uppercase">Back to Blog</g-link>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
interface Post {
  title: string;
  date: string;
  content: string;
  tags: string[];
}

const route = useRoute();
const localePath = useLocalePath();

const slug = computed(() => String(route.params.post || ''));

const { data: post } = await useAsyncData<Post>(
  () => `post-${slug.value}`,
  () => $fetch(`/api/post/${slug.value}`),
);

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}

useHead({ title: post.value.title });
</script>
