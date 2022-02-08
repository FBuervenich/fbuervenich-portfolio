<template>
  <div>
    <h2 class="font-bold mb-6">Contact me:</h2>

    <div
      class="absolute right-0 top-0"
      style="transform: translate(100%) rotate(180deg)"
    >
      <svg width="170px" height="170px">
        <use xlink:href="#dots-triangle" />
      </svg>
    </div>

    <div class="text-lg sm:text-lg mb-16">
      <form
        @submit.prevent="handleSubmit"
        class="mb-12"
        data-netlify="true"
        netlify-honeypot="bot-field"
        name="contact"
        method="POST"
        action="/success/"
      >
        <p class="hidden">
          <label>
            Don’t fill this out if you’re human:
            <input name="bot-field" />
          </label>
        </p>
        <div class="flex flex-wrap mb-6 -mx-4">
          <label class="block mb-2 text-copy-primary" for="name">Name</label>

          <input
            v-model="formData.name"
            type="text"
            name="name"
            id="name"
            placeholder="Jon Snow"
            class="block w-full bg-background-form border border-border-color-primary shadow rounded outline-none focus:border-red-700 mb-2 p-4"
            required
          />

          <label class="block text-copy-primary mb-2" for="email">
            Email Address
          </label>

          <input
            v-model="formData.email"
            type="email"
            name="email"
            id="email"
            placeholder="email@example.com"
            class="block w-full bg-background-form border border-border-color-primary shadow rounded outline-none focus:border-red-700 mb-2 p-4"
            required
          />
        </div>

        <div class="w-full mb-12">
          <label class="block text-copy-primary mb-2" for="message">
            Message
          </label>

          <textarea
            v-model="formData.message"
            id="message"
            rows="5"
            name="message"
            class="block w-full bg-background-form border border-border-color-primary shadow rounded outline-none appearance-none focus:border-red-700 mb-2 px-4 py-4"
            placeholder="Enter your message here."
            required
          ></textarea>
        </div>

        <div class="flex justify-end w-full">
          <input
            type="submit"
            value="Submit"
            class="block bg-red-700 hover:bg-green-800 text-white text-sm font-semibold tracking-wide uppercase shadow rounded cursor-pointer px-6 py-3"
          />
        </div>
      </form>
    </div>
    <AppModal v-model="successModalOpen">
      <div
        class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-5"
      >
        <svg
          class="h-6 w-6 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </div>
      <h3 class="text-xl leading-6 font-large text-gray-900">Success!</h3>
      <div class="px-7 pt-3 pb-5">
        <p class="text-md text-gray-500">Your message was submitted.</p>
      </div>
      <button
        type="button"
        class="bg-red-700 hover:bg-green-800 w-full text-white text-sm font-semibold tracking-wide uppercase shadow rounded cursor-pointer px-6 py-3"
        @click="successModalOpen = false"
      >
        Close
      </button>
    </AppModal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AppModal from './AppModal.vue';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default Vue.extend({
  components: {
    AppModal,
  },
  data: function (): {
    formData: FormData;
    successModalOpen: boolean;
  } {
    return {
      formData: {
        name: '',
        email: '',
        message: '',
      },
      successModalOpen: false,
    };
  },
  methods: {
    encode(data: { 'form-name': string; [key: string]: string }): string {
      return Object.keys(data)
        .map(
          key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        )
        .join('&');
    },
    handleSubmit(e: { target: HTMLInputElement }) {
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: this.encode({
          'form-name': e.target.getAttribute('name') ?? '',
          ...this.formData,
        }),
      })
        .then(() => {
          this.successModalOpen = true;
        })
        .catch(error => alert(error));
    },
  },
});
</script>

<style lang="scss" scoped></style>
