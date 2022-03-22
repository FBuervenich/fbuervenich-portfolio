<template>
  <Layout>
    <div
      class="hero container-inner mx-auto flex flex-col sm:flex-row justify-between py-16 mt-8"
    >
      <div
        class="flex flex-col justify-center text-4xl font-bold w-full sm:w-3/5 text-center sm:text-left"
      >
        <div class="leading-tight">
          {{ $t('pages.index.title_text') }}
        </div>
        <div class="text-red-700 leading-tight">
          {{ $t('pages.index.subtitle_text') }}
        </div>
      </div>
      <div class="mt-8 sm:mt-0 w-1/5">
        <g-image
          src="../../static/developer_activity.svg"
          alt="hero"
          class="mx-auto sm:mx-0"
        />
      </div>
    </div>

    <div class="container-inner mx-auto py-6">
      <i18n path="pages.index.introduction" class="text-lg sm:text-xl" tag="p">
        <template #nextaudit>
          <a href="https://next-audit.de/" target="_blank" rel="noopener">
            nextAudit
          </a>
        </template>
      </i18n>
      <p class="text-lg sm:text-xl"></p>
    </div>

    <div class="overflow-x-hidden">
      <div id="projects" style="position: relative; top: -40px; left: 0" />
      <div
        class="projects container-inner mx-auto text-xl border-t border-gray-500 border-b py-16 mb-16 relative"
      >
        <h2 class="font-bold mb-6">
          {{ $t('pages.index.projects_title') }}
        </h2>

        <div
          class="absolute right-0"
          style="top: 50px; transform: translate(100%) rotate(180deg)"
        >
          <svg width="170px" height="170px">
            <use xlink:href="#dots-triangle" />
          </svg>
        </div>

        <ul class="text-lg sm:text-xl space-y-6">
          <li
            class="checkmark"
            v-for="step in $page.steps.edges"
            :key="step.node.id"
          >
            <div>
              {{ $translate(step.node.name) }}
            </div>
            <!-- prettier-ignore -->
            <div class="text-lg text-gray-600 pre">{{
                $translate(step.node.description)
                }}</div>
            <div class="text-lg text-gray-gray-900">
              {{ formatTechnologies(step.node) }}
            </div>
            <div v-if="step.node.projectUrl">
              <a
                class="inline-block"
                :href="step.node.projectUrl"
                target="_blank"
                rel="noopener"
              >
                {{ $translate(step.node.projectUrlDescription) }}
              </a>
            </div>
          </li>
        </ul>
      </div>
      <!-- end projects -->
    </div>

    <div class="overflow-x-hidden border-gray-200 border-b">
      <div id="about" style="position: relative; top: -40px; left: 0" />
      <div
        class="get-to-know-me container-inner mx-auto text-xl pb-16 relative"
      >
        <h2 class="font-bold mb-6">
          {{ $t('pages.index.about_title') }}
        </h2>

        <div
          class="absolute left-0"
          style="top: 50px; transform: translateX(-100%)"
        >
          <svg width="170px" height="170px">
            <use xlink:href="#dots-triangle" />
          </svg>
        </div>

        <div
          class="flex flex-col sm:flex-row justify-between items-center mb-16"
        >
          <div>
            <g-image
              src="../../static/Florentin.png"
              alt="avatar"
              class="w-32 h-32 rounded-full mb-8 lg:mb-0"
            />
          </div>
          <div class="flex-1 text-lg sm:text-xl ml-6">
            <div class="font-bold">
              {{ `${personalData.firstName} ${[personalData.lastName]}` }}
            </div>
            <div>
              {{ $t('pages.index.about_subtitle') }}
            </div>
          </div>
        </div>
      </div>
      <!-- end get-to-know me -->
    </div>

    <div class="overflow-x-hidden">
      <div id="contact" style="position: relative; top: -40px; left: 0" />
      <div class="contact-me bg-background-secondary pt-16">
        <div class="container-inner mx-auto text-xl pb-4 relative">
          <ContactForm />
        </div>
      </div>
      <!-- end contact-me -->
    </div>
  </Layout>
</template>

<page-query>
query {
  singletons: allSingletons {
    edges {
      node {
        id
        type
        data {
          firstName
          lastName
        }
      }
    }
  }
  steps: allProjects {
    edges {
      node {
        id
        name {
          en
          de
        }
        heading {
          en
          de
        }
        description {
          en
          de
        }
        projectUrl
        projectUrlDescription {
          en
          de
        }
        technologies {
          en
          de
        }
      }
    }
  }
}
</page-query>

<script lang="ts">
import Vue from 'vue';
import ContactForm from '../components/ContactForm.vue';
import { LocalizedString } from '@/types';

export default Vue.extend({
  metaInfo: {
    title: 'Home',
  },
  components: {
    ContactForm,
  },
  computed: {
    personalData: function () {
      const data = this.$page.singletons.edges.find(
        (v: any) => v.node.type === 'Personal'
      );
      return data.node.data;
    },
  },
  methods: {
    formatTechnologies(stepNode: {
      technologies?: LocalizedString[];
      [x: string]: unknown;
    }): string {
      return stepNode.technologies
        ? stepNode.technologies.map(v => this.$translate(v)).join(' | ')
        : '';
    },
  },
});
</script>

<style scoped>
.pre {
  white-space: pre-wrap;
}
</style>
