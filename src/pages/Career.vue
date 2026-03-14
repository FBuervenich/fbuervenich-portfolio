<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <h2 class="text-4xl font-bold mb-16">{{ $t('pages.career.title') }}</h2>
      <div class="flex">
        <div class="md:w-4/5 w-full">
          <ol class="relative border-l border-gray-200 dark:border-gray-700">
            <li
              v-for="(step, index) in steps"
              :key="String(step.id)"
              class="mb-10 ml-6"
            >
              <span
                v-if="isLatestPositionForCompany(index)"
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
              <span
                v-else
                class="absolute -left-1.5 mt-1.5 w-3 h-3 bg-gray-400 rounded-full ring-8 ring-white dark:ring-primary"
              />
              <h3
                class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white"
              >
                {{ $translate(step.position) }}, {{ $translate(step.company) }}
              </h3>
              <time
                class="block mb-2 text-sm font-normal leading-none text-gray-600 dark:text-gray-500"
              >
                {{ getDurationString(step) }}
              </time>
              <div
                class="mb-4 text-base font-normal text-gray-800 dark:text-gray-400"
              >
                <ul class="content-list">
                  <li v-for="(content, idx) in step.content || []" :key="idx">
                    {{ $translate(content) }}
                  </li>
                </ul>
              </div>
              <p>{{ formatTechnologies(step.technologies) }}</p>
            </li>
          </ol>
        </div>
        <div class="md:w-1/5 w-0 pl-10">
          <g-image src="/resume.svg" alt="Resume" />
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import type { LocalizedString } from '../types';
import { usePortfolioCareer } from '../composables/usePortfolioCareer';

interface CareerStep {
  id: string;
  position: LocalizedString;
  company: LocalizedString;
  startDate: string;
  endDate: string;
  technologies?: LocalizedString[];
  content?: LocalizedString[];
}

const { t } = useI18n();
const { data: careerData } = await usePortfolioCareer();

const steps = computed<CareerStep[]>(() => {
  const careerSteps = (careerData.value as CareerStep[]) || [];
  return [...careerSteps].reverse();
});

useHead({ title: 'Career' });

function isLatestPositionForCompany(index: number): boolean {
  const currentStep = steps.value[index];

  if (!currentStep) {
    return true;
  }

  const currentCompanyKey = getCompanyKey(currentStep.company);

  for (let i = 0; i < index; i += 1) {
    const previousCompanyKey = getCompanyKey(steps.value[i].company);
    if (previousCompanyKey === currentCompanyKey) {
      return false;
    }
  }

  return true;
}

function getCompanyKey(company: LocalizedString): string {
  return `${company.en}::${company.de}`;
}

function getDurationString(stepNode: CareerStep): string {
  const startDate = new Date(stepNode.startDate);
  const endDate = Number.isNaN(Date.parse(stepNode.endDate))
    ? new Date()
    : new Date(stepNode.endDate);
  const months = monthDiff(startDate, endDate);

  return `${formatPeriod(startDate, stepNode.endDate)} · ${formatDuration(
    months
  )}`;
}

function formatPeriod(startDate: Date, endDate: string): string {
  const endDateString = Number.isNaN(Date.parse(endDate))
    ? 'Present'
    : new Date(endDate).toISOString().substring(0, 7);
  const startDateString = startDate.toISOString().substring(0, 7);

  return `${startDateString} - ${endDateString}`;
}

function formatDuration(noMonths: number): string {
  if (noMonths < 12) {
    return formatMonths(noMonths);
  }

  const noYears = Math.floor(noMonths / 12);
  const noRestMonths = noMonths % 12;

  return noRestMonths === 0
    ? formatYears(noYears)
    : `${formatYears(noYears)}, ${formatMonths(noRestMonths)}`;
}

function formatMonths(noMonths: number): string {
  return String(t('common.durations.month', noMonths));
}

function formatYears(noYears: number): string {
  return String(t('common.durations.year', noYears));
}

function monthDiff(d1: Date, d2: Date): number {
  let months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth() - 1;
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

function formatTechnologies(technologies?: LocalizedString[]): string {
  return technologies
    ? technologies.map(item => useNuxtApp().$translate(item)).join(' | ')
    : '';
}
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
