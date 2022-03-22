<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <h2 class="text-4xl font-bold mb-16">{{ $t('pages.career.title') }}</h2>
      <div class="flex">
        <div class="md:w-4/5 w-full">
          <ol class="relative border-l border-gray-200 dark:border-gray-700">
            <li
              class="mb-10 ml-6"
              v-for="step in $page.steps.edges"
              :key="step.node.id"
            >
              <span
                class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-red-700 bg-opacity-50 rounded-full ring-8 ring-white dark:ring-primary dark:bg-white"
              >
                <svg
                  class="w-3 h-3 text-red-700 fill-current"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
              <h3
                class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white"
              >
                {{ $translate(step.node.position) }},
                {{ $translate(step.node.company) }}
              </h3>
              <time
                class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
              >
                {{ getDurationString(step.node) }}
              </time>
              <div
                class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
              >
                <ul class="content-list">
                  <li v-for="(content, idx) in step.node.content" :key="idx">
                    {{ $translate(content) }}
                  </li>
                </ul>
              </div>
              <p>{{ formatTechnologies(step.node) }}</p>
            </li>
          </ol>
        </div>
        <div class="md:w-1/5 w-0 pl-10">
          <g-image src="../../static/resume.svg" alt="Resume" />
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query Career {
  steps: allCareer (sortBy: "startDate", order: DESC) {
    edges {
      node {
        id
        position {
          en
          de
        }
        company {
          en
          de
        }
        startDate
        endDate
        active
        technologies {
          en
          de
        }
        content {
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
import { LocalizedString } from '@/types';

export default Vue.extend({
  metaInfo: {
    title: 'Career',
  },
  methods: {
    getDurationString(stepNode: {
      startDate: string;
      endDate: string;
      [x: string]: unknown;
    }): string {
      const startDate = new Date(stepNode.startDate);
      const endDate = isNaN(Date.parse(stepNode.endDate))
        ? new Date()
        : new Date(stepNode.endDate);
      const months = this.monthDiff(startDate, endDate);
      return `${this.formatPeriod(
        startDate,
        stepNode.endDate
      )} · ${this.formatDuration(months)}`;
    },
    formatPeriod(startDate: Date, endDate: string) {
      const endDateString = isNaN(Date.parse(endDate))
        ? 'Present'
        : new Date(endDate).toISOString().substring(0, 7);
      const startDateString = startDate.toISOString().substring(0, 7);
      return `${startDateString} - ${endDateString}`;
    },
    formatDuration(noMonths: number): string {
      if (noMonths < 12) {
        return this.formatMonths(noMonths);
      }
      const noYears = Math.floor(noMonths / 12);
      const noRestMonths = noMonths % 12;
      return noRestMonths === 0
        ? this.formatYears(noYears)
        : `${this.formatYears(noYears)}, ${this.formatMonths(noRestMonths)}`;
    },
    formatMonths(noMonths: number): string {
      return this.$tc('common.durations.month', noMonths).toString();
    },
    formatYears(noYears: number): string {
      return this.$tc('common.durations.year', noYears).toString();
    },
    monthDiff(d1: Date, d2: Date) {
      let months;
      months = (d2.getFullYear() - d1.getFullYear()) * 12;
      months -= d1.getMonth() - 1;
      months += d2.getMonth();
      return months <= 0 ? 0 : months;
    },
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
ul.content-list {
  list-style: none;
  margin-left: 0;
  padding-left: 0;
}

ul.content-list > li {
  padding-left: 1em;
  text-indent: -1em;
}

ul.content-list > li:before {
  content: '•';
  padding-right: 5px;
}
</style>
