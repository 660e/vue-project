import type { RouteRecordRaw } from 'vue-router';

export default {
  path: '/example',
  children: [
    {
      path: 'contextmenu',
      component: () => import('@/views/_example/ContextMenu.vue'),
    },
  ],
} as RouteRecordRaw;
