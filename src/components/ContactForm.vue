<template>
  <div>
    <h2 class="font-bold mb-6">{{ $t('components.contact_form.title') }}</h2>

    <div class="absolute right-0 top-0" style="transform: translate(100%) rotate(180deg)">
      <svg width="170px" height="170px">
        <use xlink:href="#dots-triangle" />
      </svg>
    </div>

    <div class="text-lg sm:text-lg mb-16">
      <form
        class="mb-12"
        data-netlify="true"
        netlify-honeypot="botField"
        name="contact"
        method="POST"
        action="/success/"
        @submit.prevent="handleSubmit"
      >
        <div class="flex flex-wrap mb-6 -mx-4">
          <div class="hidden">
            <label for="botField">Don’t fill this out if you’re human:</label>
            <input name="botField" v-model="formData.botField" />
          </div>
          <div class="w-full md:w-1/2 mb-6 md:mb-0 px-4">
            <label class="block mb-2 text-copy-primary" for="name">
              {{ $t('components.contact_form.field_name') }}
            </label>

            <input
              id="name"
              v-model="formData.name"
              type="text"
              name="name"
              :placeholder="$t('components.contact_form.placeholder_name')"
              class="block w-full bg-background-form border border-border-color-primary shadow rounded outline-none focus:border-red-700 mb-2 p-4"
              required
            />
          </div>

          <div class="w-full px-4 md:w-1/2">
            <label class="block text-copy-primary mb-2" for="email">
              {{ $t('components.contact_form.field_email') }}
            </label>

            <input
              id="email"
              v-model="formData.email"
              type="email"
              name="email"
              :placeholder="$t('components.contact_form.placeholder_mail')"
              class="block w-full bg-background-form border border-border-color-primary shadow rounded outline-none focus:border-red-700 mb-2 p-4"
              required
            />
          </div>
        </div>

        <div class="w-full mb-12">
          <label class="block text-copy-primary mb-2" for="message">
            {{ $t('components.contact_form.field_message') }}
          </label>

          <textarea
            id="message"
            v-model="formData.message"
            rows="5"
            name="message"
            class="block w-full bg-background-form border border-border-color-primary shadow rounded outline-none appearance-none focus:border-red-700 mb-2 px-4 py-4"
            :placeholder="$t('components.contact_form.placeholder_message')"
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
      <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-5">
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
      <h3 class="text-xl leading-6 font-large text-gray-900">
        {{ $t('components.contact_form.success_title') }}
      </h3>
      <div class="px-7 pt-3 pb-5">
        <p class="text-md text-gray-500">
          {{ $t('components.contact_form.success_message') }}
        </p>
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

<script setup lang="ts">
interface FormData {
  name: string;
  email: string;
  message: string;
  botField: string;
}

const formData = reactive<FormData>({
  name: '',
  email: '',
  message: '',
  botField: '',
});

const successModalOpen = ref(false);

function encode(data: Record<string, string>): string {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

async function handleSubmit(event: Event) {
  const target = event.target as HTMLFormElement;
  try {
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': target.getAttribute('name') || '',
        ...formData,
      }),
    });
    successModalOpen.value = true;
  } catch (error) {
    alert(error);
  }
}
</script>
