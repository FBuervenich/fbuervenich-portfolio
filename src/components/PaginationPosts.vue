<template>
  <div class="flex justify-between text-xl items-center">
    <g-link
      :to="previousPage"
      :class="{ 'text-gray-400 hover:text-gray-400 cursor-not-allowed': !showPreviousPage }"
      data-cypress="prev"
    >
      &larr; Prev
    </g-link>
    <div class="text-base">Page {{ currentPage }} of {{ totalPages }}</div>
    <g-link
      :to="nextPage"
      :class="{ 'text-gray-400 hover:text-gray-400 cursor-not-allowed': !showNextPage }"
      data-cypress="next"
    >
      Next &rarr;
    </g-link>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  base: string;
  totalPages: number;
  currentPage: number;
}>();

const showPreviousPage = computed(() => props.currentPage !== 1);
const previousPage = computed(() =>
  [0, 1].includes(props.currentPage - 1) ? props.base : `${props.base}/${props.currentPage - 1}`,
);
const showNextPage = computed(() => props.currentPage !== props.totalPages);
const nextPage = computed(() =>
  props.totalPages > props.currentPage
    ? `${props.base}/${props.currentPage + 1}`
    : `${props.base}/${props.currentPage}`,
);
</script>
