import type { RouteRecordRaw } from 'vue-router';

export default {
  path: '/playground',
  children: [
    {
      path: 'abort',
      component: () => import('@/views/_playground/abort/index.vue'),
    },
    {
      path: 'contextmenu',
      component: () => import('@/views/_playground/contextmenu/index.vue'),
    },
    {
      path: 'download',
      component: () => import('@/views/_playground/download/index.vue'),
    },
    {
      path: 'upload',
      component: () => import('@/views/_playground/upload/index.vue'),
    },
  ],
} as RouteRecordRaw;
