import type { RouteRecordRaw } from 'vue-router';

export default {
  path: '/',
  children: [
    {
      path: '',
      component: () => import('@/views/home/index.vue'),
    },
  ],
} as RouteRecordRaw;
