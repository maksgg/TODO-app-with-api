import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import { authGuard } from "./authGuards";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("@/pages/Dashboard/index.vue"),
    meta: {
      requiredAuth: true,
      title: "Dashboard",
      layout: "default",
    },
  },
  {
    path: "/list",
    name: "list",
    component: () => import("@/pages/List/index.vue"),
    meta: {
      requiredAuth: true,
      title: "Lists of tasks",
    },
  },
  {
    path: "/analytics",
    name: "Analytics",
    component: () => import("@/pages/Analytics/index.vue"),
    meta: {
      requiredAuth: true,
      title: "Analytics",
      layout: "default",
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/pages/Profile/index.vue"),
    meta: {
      requiredAuth: true,
      title: "Own Profile",
    },
  },
  {
    path: "/users/:id",
    name: "user",
    component: () => import("@/pages/Users/UserInfo.vue"),
    meta: {
      requiredAuth: true,
      title: "UserInfo",
      role: "admin",
    },
  },
  {
    path: "/users",
    name: "admin",
    component: () => import("@/pages/Users/index.vue"),
    meta: {
      requiredAuth: true,
      title: "AdminPanel",
      role: "admin",
    },
  },
  {
    path: "/auth",
    name: "auth",
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

router.beforeEach(authGuard);

router.afterEach((to) => document.title = (to.meta.title as string) || "Task manager");

export default router;
