<template>
  <img :src="resolvedSrc" :alt="alt" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  src: string;
  alt?: string;
}>();

const resolvedSrc = computed(() => {
  if (!props.src) {
    return '';
  }

  if (props.src.startsWith('http://') || props.src.startsWith('https://')) {
    return props.src;
  }

  const normalized = props.src
    .replace(/^\.\.\/\.\.\/static\//, '/')
    .replace(/^\/(en|de)\//, '/');

  if (normalized.startsWith('/')) {
    return normalized;
  }

  return `/${normalized}`;
});
</script>
