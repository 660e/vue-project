import type { RouteRecordRaw } from 'vue-router';

export default {
  path: '/example',
  children: [
    {
      path: 'deepseek',
      component: () => import('@/views/_example/DeepSeek.vue'),
    },
    {
      path: 'import-meta',
      component: () => import('@/views/_example/ImportMeta.vue'),
    },
    {
      path: 'playground',
      component: () => import('@/views/_example/Playground.vue'),
    },
    {
      path: 'randomuser',
      component: () => import('@/views/_example/RandomUser.vue'),
    },
  ],
} as RouteRecordRaw;
