import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import { authGuard } from "./authGuards";
import { permissionGuard } from "./permissionsGuard";

import { i18n } from "@/shared/composables/useI18n";
import { useAuthStore } from "@/shared/stores/useAuthStore";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("@/pages/Dashboard/index.vue"),
    meta: {
      title: () => i18n.global.t("sidebar.links.dashboard"),
      icon: "home",
      permission: "read:dashboard",
    },
  },
  {
    path: "/list/:id",
    name: "Tasks",
    component: () => import("@/pages/List/Tasks.vue"),
    meta: {
      permission: "read:task",
    },
  },
  {
    path: "/list",
    name: "List",
    component: () => import("@/pages/List/index.vue"),
    meta: {
      title: () => i18n.global.t("sidebar.links.lists"),
      headerTitle: () => i18n.global.t("header.title.manage_all_your_task_groups_in_one_place"),
      icon: "list",
      permission: "read:list",
    },
  },
  {
    path: "/analytics",
    name: "Analytics",
    component: () => import("@/pages/Analytics/index.vue"),
    meta: {
      title: () => i18n.global.t("sidebar.links.analytics"),
      headerTitle: () => i18n.global.t("header.title.see_how_your_tasks_are_progressing_over_time"),
      icon: "analytics",
      permission: "read:analytics",
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/pages/Profile/index.vue"),
    meta: {
      title: () => i18n.global.t("sidebar.links.profile"),
      icon: "user",
    },
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("@/pages/Users/index.vue"),
    meta: {
      title: () => i18n.global.t("sidebar.links.admin_panel"),
      role: "admin",
      icon: "tool",
      permission: "read:users",
    },
  },
  {
    path: "/credentials",
    name: "Credentials",
    component: () => import("@/pages/Credentials/invex.vue"),
    meta: {
      title: () => i18n.global.t("sidebar.links.about_us"),
      icon: "users",
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
router.afterEach((to) => document.title = `Task manager - ${to.name as string}`);

export default router;
