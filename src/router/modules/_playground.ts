import type { RouteRecordRaw } from 'vue-router';

export default {
  path: '/playground',
  children: [
    {
      path: 'abort',
      component: () => import('@/views/_playground/abort.vue'),
    },
    {
      path: 'contextmenu',
      component: () => import('@/views/_playground/contextmenu.vue'),
    },
    {
      path: 'download',
      component: () => import('@/views/_playground/download.vue'),
    },
    {
      path: 'upload',
      component: () => import('@/views/_playground/upload.vue'),
    },
  ],
} as RouteRecordRaw;
