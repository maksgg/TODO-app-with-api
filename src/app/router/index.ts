import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import { authGuard } from "./authGuards";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/Home/index.vue"),
    meta: {
      requiredAuth: true,
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
      guestOnly: true,
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

router.beforeEach(authGuard);

router.afterEach((to) => document.title = (to.meta.title as string) || "Task manager");

export default router;
