import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes = import.meta.glob<{ default: RouteRecordRaw }>('./modules/*.ts', { eager: true });

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: Object.values(routes).map((route) => route.default),
});

export default router;
