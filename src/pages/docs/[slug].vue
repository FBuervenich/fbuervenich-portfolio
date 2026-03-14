<template>
  <Layout>
    <div class="container-inner mx-auto my-16">
      <h1 class="text-4xl font-bold leading-tight">{{ doc?.title }}</h1>
      <div class="markdown-body" v-html="doc?.content" />
    </div>
  </Layout>
</template>

<script setup lang="ts">
interface DocPage {
  title: string;
  excerpt: string;
  content: string;
}

const route = useRoute();

const slug = computed(() => String(route.params.slug || ''));
const { data: doc } = await useAsyncData<DocPage>(
  () => `docs-${slug.value}`,
  () => $fetch(`/api/docs/${slug.value}`),
);

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: 'Documentation page not found' });
}

useHead({ title: doc.value.title });
</script>
