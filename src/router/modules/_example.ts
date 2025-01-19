import type { RouteRecordRaw } from 'vue-router';

export default {
  path: '/example',
  children: [
    {
      path: 'random-user',
      component: () => import('@/views/_example/RandomUser.vue'),
    },
  ],
} as RouteRecordRaw;
