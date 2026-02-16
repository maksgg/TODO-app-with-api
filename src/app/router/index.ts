import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import { authGuard } from "./authGuards";
import { permissionGuard } from "./permissionsGuard";

import { useAuthStore } from "@/shared/stores/useAuthStore";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("@/pages/Dashboard/index.vue"),
    meta: {
      title: "Dashboard",
      icon: "home",
      permission: "read:dashboard",
    },
  },
  {
    path: "/list",
    name: "List",
    component: () => import("@/pages/List/index.vue"),
    meta: {
      title: "Lists",
      headerTitle: "Manage all your task groups in one place",
      icon: "list",
      permission: "read:list",
    },
  },
  {
    path: "/analytics",
    name: "Analytics",
    component: () => import("@/pages/Analytics/index.vue"),
    meta: {
      title: "Analytics",
      headerTitle: "See how your tasks are progressing over time",
      icon: "analytics",
      permission: "read:analytics",
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/pages/Profile/index.vue"),
    meta: {
      title: "Profile",
      icon: "user",
    },
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("@/pages/Users/index.vue"),
    meta: {
      title: "AdminPanel",
      role: "admin",
      icon: "tool",
      permission: "read:users",
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
  history: createWebHashHistory(import.meta.env.BASE_URL || "/"),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  await authStore.setUser();

  const authRes = authGuard(to);
  if (authRes) return next(authRes);

  const permRes = permissionGuard(to);
  if (permRes) return next(permRes);

  next();
});
router.afterEach((to) => document.title = (to.meta.title as string) || "Task manager");

export default router;
