<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <h2 class="text-4xl font-bold mb-16">{{ $t('pages.privacy.title') }}</h2>
      <div class="flex flex-row">
        <div class="md:w-3/5 w-full">
          <div v-for="(section, idx) in privacySections" :key="idx">
            <p class="text-2xl font-bold mt-5 mb-2">{{ section.heading }}</p>
            <p v-for="(paragraph, pIdx) in section.paragraphs" :key="pIdx">
              {{ paragraph }}
            </p>
          </div>
        </div>
        <div class="md:w-2/5 w-0">
          <g-image src="/gdpr.svg" alt="Privacy policy" />
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
interface PrivacySection {
  heading: string;
  paragraphs: string[];
}

const privacySections = ref<PrivacySection[]>([]);

useHead({ title: 'Privacy policy' });
</script>
<style scoped></style>
