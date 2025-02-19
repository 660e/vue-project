import type { RouteRecordRaw } from 'vue-router';

export default {
  path: '/example',
  children: [
    {
      path: 'random-user',
      component: () => import('@/views/_example/RandomUser.vue'),
    },
    {
      path: 'utils-playground',
      component: () => import('@/views/_example/UtilsPlayground.vue'),
    },
  ],
} as RouteRecordRaw;
