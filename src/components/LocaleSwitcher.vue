<template>
  <div>
    <div ref="language-picker" class="relative inline-block text-left">
      <div>
        <button
          type="button"
          class="emojiFlag inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="menu-button"
          @click="visible = !visible"
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
          <a
            v-for="(locale, index) in availableLocales"
            :key="index"
            class="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
            role="menuitem"
            :tabindex="index"
            id="menu-item-0"
            @click.prevent="localeChanged(locale)"
          >
            <img src="" alt="" />
            <span class="emojiFlag">
              {{ $t(`common.languages.${locale}`) }}
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LocaleSwitcher',
  data: function () {
    return {
      visible: false,
      currentLocale: this.$i18n.locale.toString(),
      availableLocales: this.$i18n.availableLocales,
    };
  },
  computed: {},
  methods: {
    localeChanged(newLocale) {
      this.visible = false;
      if (newLocale !== this.currentLocale) {
        this.currentLocale = newLocale;
        this.$router
          .push({
            path: this.$tp(this.$route.path, this.currentLocale, true),
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
  },
  mounted() {
    document.addEventListener('click', () => {
      this.visible = false;
    });

    this.$refs['language-picker'].addEventListener('click', event => {
      event.stopPropagation();
    });
  },
};
</script>

<style scoped>
.emojiFlag {
  font-family: 'NotoColorEmojiLimited', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
}
</style>
