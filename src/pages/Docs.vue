<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <div v-for="doc in docs" :key="doc.id" class="post border-gray-400 border-b mb-12">
        <h2 class="text-3xl font-bold">
          <g-link :to="localePath(doc.path)" class="text-copy-primary">{{ doc.title }}</g-link>
        </h2>

        <div class="text-lg mb-4">{{ doc.excerpt }}</div>

        <div class="mb-8">
          <g-link :to="localePath(doc.path)" class="font-bold uppercase">Read More</g-link>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
interface DocPageItem {
  id: string;
  path: string;
  title: string;
  excerpt: string;
}

const localePath = useLocalePath();
const { data } = await useAsyncData<DocPageItem[]>('docs-index', () => $fetch('/api/docs'));

const docs = computed(() => data.value || []);

useHead({ title: 'Docs' });
</script>
