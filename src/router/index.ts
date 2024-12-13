import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/home.vue'),
    },
    {
      path: '/playground',
      children: [
        {
          path: 'ajax',
          component: () => import('@/views/playground/ajax.vue'),
        },
      ],
    },
  ],
});

export default router;
