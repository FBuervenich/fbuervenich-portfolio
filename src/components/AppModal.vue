<template>
  <Transition name="fade">
    <div v-show="value">
      <!--Overlay Effect-->
      <div
        class="fixed z-40 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        id="my-modal"
      ></div>
      <div
        class="fixed z-50 inset-0 w-full h-screen flex items-center justify-center bg-semi-75"
        @click.self="closeModal"
      >
        <div class="relative px-4 w-full max-w-md h-full md:h-auto">
          <!-- Modal content -->
          <div class="relative bg-white rounded shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex justify-end p-2">
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                @click="closeModal"
              >
                <svg
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 pt-0 text-center">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    value: { type: Boolean, required: true },
  },
  data: function () {
    return {};
  },
  methods: {
    closeModal() {
      this.$emit('input', false);
    },
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
