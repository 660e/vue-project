import type { RouteRecordRaw } from 'vue-router';

export default {
  path: '/example',
  children: [
    {
      path: 'deepseek',
      component: () => import('@/views/example/Deepseek.vue'),
    },
    {
      path: 'import-meta',
      component: () => import('@/views/example/ImportMeta.vue'),
    },
    {
      path: 'leaflet',
      component: () => import('@/views/example/Leaflet.vue'),
    },
    {
      path: 'playground',
      component: () => import('@/views/example/Playground.vue'),
    },
    {
      path: 'random-user',
      component: () => import('@/views/example/RandomUser.vue'),
    },
    {
      path: 'web-component',
      component: () => import('@/views/example/WebComponent.vue'),
    },
  ],
} as RouteRecordRaw;
