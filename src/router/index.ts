import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

const routes = import.meta.glob<{ default: RouteRecordRaw }>('./modules/*.ts', { eager: true });

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: Object.values(routes).map((route) => route.default),
  scrollBehavior: () => ({ top: 0, left: 0 }),
});

export default router;
