import type { RouteRecordRaw } from 'vue-router';

export default {
  path: '/playground',
  children: [
    {
      path: 'abort',
      component: () => import('@/views/_playground/Abort.vue'),
    },
    {
      path: 'contextmenu',
      component: () => import('@/views/_playground/ContextMenu.vue'),
    },
    {
      path: 'download',
      component: () => import('@/views/_playground/Download.vue'),
    },
    {
      path: 'indexed-db',
      component: () => import('@/views/_playground/IndexedDB.vue'),
    },
    {
      path: 'upload',
      component: () => import('@/views/_playground/Upload.vue'),
    },
    {
      path: 'web-assembly',
      component: () => import('@/views/_playground/WebAssembly.vue'),
    },
    {
      path: 'web-workers',
      component: () => import('@/views/_playground/WebWorkers.vue'),
    },
  ],
} as RouteRecordRaw;
