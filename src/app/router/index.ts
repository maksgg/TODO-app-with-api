import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import { authGuard } from "./authGuards";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/Home/index.vue"),
    meta: {
      requiredAuth: true, // in the end of development change to true?
      title: "Home",
      layout: "default",
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/Auth/index.vue"),
    meta: {
      requiredAuth: false,
      title: "Authorization",
      layout: "auth",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/pages/NotFound/index.vue"),
    meta: {
      title: "404 - Сторінку не знайдено",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || "/"),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) || "TODO Vue 3";

  authGuard(to, from, next);
});

export default router;
