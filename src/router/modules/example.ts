import type { RouteRecordRaw } from 'vue-router';

export default {
  path: '/example',
  children: [
    {
      path: 'deepseek',
      component: () => import('@/views/example/Deepsseek.vue'),
    },
    {
      path: 'import-meta',
      component: () => import('@/views/example/ImportMeta.vue'),
    },
    {
      path: 'playground',
      component: () => import('@/views/example/Playground.vue'),
    },
    {
      path: 'random-user',
      component: () => import('@/views/example/RandomUser.vue'),
    },
  ],
} as RouteRecordRaw;
