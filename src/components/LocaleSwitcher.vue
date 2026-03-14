<template>
  <div>
    <div
      ref="languagePicker"
      class="relative inline-block text-left"
      @click.stop
    >
      <div>
        <button
          id="menu-button"
          type="button"
          class="emojiFlag inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          @click.stop="visible = !visible"
        >
          {{ $t('layouts.default.navigation_language') }}:
          {{ $t(`common.languages.${currentLocale}`) }}
          <svg
            class="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div
        v-if="visible"
        class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        tabindex="-1"
      >
        <div class="py-1" role="none">
          <button
            type="button"
            v-for="(localeCode, index) in availableLocales"
            :id="`menu-item-${index}`"
            :key="localeCode"
            class="text-left text-gray-700 block px-4 py-2 text-sm cursor-pointer w-full"
            role="menuitem"
            :tabindex="index"
            @click="localeChanged(localeCode)"
          >
            <span class="emojiFlag">
              {{ $t(`common.languages.${localeCode}`) }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const visible = ref(false);
const languagePicker = ref<HTMLElement | null>(null);
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
const route = useRoute();
const { locale, locales } = useI18n();

const currentLocale = computed(() => locale.value.toString());
const availableLocales = computed(() =>
  locales.value.map(localeItem => localeItem.code)
);

const localeChanged = async (newLocale: 'de' | 'en') => {
  visible.value = false;
  if (newLocale !== currentLocale.value) {
    const targetPath =
      switchLocalePath(newLocale) || localePath(route.fullPath, newLocale);
    if (targetPath) {
      await navigateTo(targetPath);
    }
  }
};

const handleDocumentClick = () => {
  visible.value = false;
};

const stopPickerClick = (event: MouseEvent) => {
  event.stopPropagation();
};

onMounted(() => {
  document.addEventListener('click', handleDocumentClick);
  languagePicker.value?.addEventListener('click', stopPickerClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick);
  languagePicker.value?.removeEventListener('click', stopPickerClick);
});
</script>

<style scoped>
.emojiFlag {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}
</style>
