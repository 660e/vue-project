import type { RouteRecordRaw } from 'vue-router';

export default {
  path: '/playground',
  children: [
    {
      path: 'abort',
      component: () => import('@/views/playground/abort.vue'),
    },
    {
      path: 'contextmenu',
      component: () => import('@/views/playground/contextmenu.vue'),
    },
    {
      path: 'download',
      component: () => import('@/views/playground/download.vue'),
    },
    {
      path: 'upload',
      component: () => import('@/views/playground/upload.vue'),
    },
  ],
} as RouteRecordRaw;
