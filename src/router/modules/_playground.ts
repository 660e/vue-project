import type { RouteRecordRaw } from 'vue-router';

export default {
  path: '/playground',
  children: [
    {
      path: 'abort',
      component: () => import('@/pages/_playground/Abort.vue'),
    },
    {
      path: 'contextmenu',
      component: () => import('@/pages/_playground/ContextMenu.vue'),
    },
    {
      path: 'download',
      component: () => import('@/pages/_playground/Download.vue'),
    },
    {
      path: 'indexed-db',
      component: () => import('@/pages/_playground/IndexedDB.vue'),
    },
    {
      path: 'upload',
      component: () => import('@/pages/_playground/Upload.vue'),
    },
    {
      path: 'web-assembly',
      component: () => import('@/pages/_playground/WebAssembly.vue'),
    },
    {
      path: 'web-workers',
      component: () => import('@/pages/_playground/WebWorkers.vue'),
    },
  ],
} as RouteRecordRaw;
