<template>
  <NuxtLink :to="to" :class="$attrs.class" v-bind="forwardedAttrs">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

defineProps<{
  to: string | Record<string, unknown>;
}>();

const attrs = useAttrs();
const forwardedAttrs = computed(() => {
  const { class: className, ...rest } = attrs;
  void className;
  return rest;
});
</script>
