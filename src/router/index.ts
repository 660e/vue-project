import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

interface RouteModule {
  default: RouteRecordRaw;
}

const modules = import.meta.glob<RouteModule>('./modules/*.ts', { eager: true });
const routes: RouteRecordRaw[] = Object.values(modules).map((module) => module.default);

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/home.vue'),
    },
    ...routes,
  ],
});

export default router;
