import posthog from 'posthog-js';

export default defineNuxtPlugin((nuxtApp) => {
  const isRealEnvironment =
    process.env.NODE_ENV === 'production' &&
    typeof window !== 'undefined' &&
    !['localhost', '127.0.0.1'].includes(window.location.hostname);

  if (!isRealEnvironment) {
    return;
  }

  posthog.init('phc_1ZwaRLmq6WjoB8YHn7gzmMFwzuJIG8grQ4tYsKHzScf', {
    api_host: 'https://ph.fbuervenich.de',
    ui_host: 'https://eu.posthog.com',
    autocapture: true,
    capture_pageview: false,
  });

  nuxtApp.$router.afterEach((to) => {
    posthog.capture('$pageview', {
      $current_url: to.fullPath,
    });
  });
});
