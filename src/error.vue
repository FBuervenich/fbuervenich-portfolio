<template>
  <NuxtLayout>
    <div class="container-inner mx-auto py-16">
      <h2 class="text-4xl font-bold mb-16">Page Not Found</h2>
      <g-image src="/404.svg" alt="404 page not found" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({ title: 'Page Not Found' });
</script>
