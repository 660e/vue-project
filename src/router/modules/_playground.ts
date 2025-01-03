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
      path: 'indexed-db',
      component: () => import('@/views/_playground/indexed-db/index.vue'),
    },
    {
      path: 'upload',
      component: () => import('@/views/_playground/upload/index.vue'),
    },
    {
      path: 'web-assembly',
      component: () => import('@/views/_playground/web-assembly/index.vue'),
    },
    {
      path: 'web-workers',
      component: () => import('@/views/_playground/web-workers/index.vue'),
    },
  ],
} as RouteRecordRaw;
