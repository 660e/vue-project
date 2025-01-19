import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const modules = import.meta.glob<{ default: RouteRecordRaw }>('./modules/*.ts', { eager: true });
const routes: RouteRecordRaw[] = Object.values(modules).map((module) => module.default);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
