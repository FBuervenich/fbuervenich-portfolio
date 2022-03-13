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
                {{ step.node.position }}, {{ step.node.company }}
              </h3>
              <time
                class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
              >
                {{ getDurationString(step.node) }}
              </time>
              <p
                class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
                v-html="step.node.content"
              ></p>
              <p>{{ formatTechStack(step.node) }}</p>
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
query CareerSteps {
  steps: allCareer (sortBy: "startDate", order: DESC) {
    edges {
      node {
        id
        position
        company
        startDate
        endDate
        active
        stack
        content
      }
    }
  }
}
</page-query>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Career extends Vue {
  public title = 'Career';

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
  }
  formatPeriod(startDate: Date, endDate: string) {
    const endDateString = isNaN(Date.parse(endDate))
      ? 'Present'
      : new Date(endDate).toISOString().substring(0, 7);
    const startDateString = startDate.toISOString().substring(0, 7);
    return `${startDateString} - ${endDateString}`;
  }
  formatDuration(noMonths: number): string {
    if (noMonths < 12) {
      return this.formatMonths(noMonths);
    }
    const noYears = Math.floor(noMonths / 12);
    const noRestMonths = noMonths % 12;
    return noRestMonths === 0
      ? this.formatYears(noYears)
      : `${this.formatYears(noYears)}, ${this.formatMonths(noRestMonths)}`;
  }
  formatMonths(noMonths: number): string {
    // return this.$t('')
    return noMonths === 1 ? `${noMonths} month` : `${noMonths} months`;
  }
  formatYears(noYears: number) {
    return noYears === 1 ? `${noYears} year` : `${noYears} years`;
  }
  monthDiff(d1: Date, d2: Date) {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() - 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }
  formatTechStack(stepNode: { stack?: string[]; [x: string]: unknown }) {
    return stepNode.stack?.join(' | ') ?? '';
  }
}

// export default Vue.extend({
//   metaInfo: {
//     title: 'Career',
//   },
//   methods: {
//     getDurationString(stepNode: {
//       startDate: string;
//       endDate: string;
//       [x: string]: unknown;
//     }): string {
//       const startDate = new Date(stepNode.startDate);
//       const endDate = isNaN(Date.parse(stepNode.endDate))
//         ? new Date()
//         : new Date(stepNode.endDate);
//       const months = this.monthDiff(startDate, endDate);
//       return `${this.formatPeriod(
//         startDate,
//         stepNode.endDate
//       )} · ${this.formatDuration(months)}`;
//     },
//     formatPeriod(startDate: Date, endDate: string) {
//       const endDateString = isNaN(Date.parse(endDate))
//         ? 'Present'
//         : new Date(endDate).toISOString().substring(0, 7);
//       const startDateString = startDate.toISOString().substring(0, 7);
//       return `${startDateString} - ${endDateString}`;
//     },
//     formatDuration(noMonths: number): string {
//       if (noMonths < 12) {
//         return this.formatMonths(noMonths);
//       }
//       const noYears = Math.floor(noMonths / 12);
//       const noRestMonths = noMonths % 12;
//       return noRestMonths === 0
//         ? this.formatYears(noYears)
//         : `${this.formatYears(noYears)}, ${this.formatMonths(noRestMonths)}`;
//     },
//     formatMonths(noMonths: number): string {
//       return this.$t('');
//       return noMonths === 1 ? `${noMonths} month` : `${noMonths} months`;
//     },
//     formatYears(noYears: number) {
//       return noYears === 1 ? `${noYears} year` : `${noYears} years`;
//     },
//     monthDiff(d1: Date, d2: Date) {
//       let months;
//       months = (d2.getFullYear() - d1.getFullYear()) * 12;
//       months -= d1.getMonth() - 1;
//       months += d2.getMonth();
//       return months <= 0 ? 0 : months;
//     },
//     formatTechStack(stepNode: { stack?: string[]; [x: string]: unknown }) {
//       return stepNode.stack?.join(' | ') ?? '';
//     },
//   },
// });
</script>
