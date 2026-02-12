import type { RouteRecordRaw } from "vue-router";

import type { SidebarLink } from "@/shared/types";

/**
 * Перевіряє доступ на основі meta.permission та масиву пермішенів юзера
 */
export const hasAccess = (userPermissions: string[], route: RouteRecordRaw): boolean => {
  const required = route.meta?.permission as string;
  // Якщо пермішен не вказаний, вважаємо сторінку доступною (наприклад, Profile)
  if (!required) return true;
  return userPermissions.includes(required);
};

/**
 * Фільтрує роути та перетворює їх у формат SidebarLink
 */
export const getAvailableRoutes = (
  allRoutes: RouteRecordRaw[], userPermissions: string[],
): SidebarLink[] => {
  return allRoutes
    .filter((route) => {
      // 1. Фільтруємо: має бути назва, іконка в meta та пройдена перевірка доступу
      // Також ігноруємо детальні сторінки з параметрами (наприклад, /list/:id)
      const isNavigable = route.meta?.icon && !route.path.includes(":");
      return isNavigable && hasAccess(userPermissions, route);
    })
    .map((route) => ({
      // 2. Перетворюємо у тип SidebarLink
      title: route.meta?.title as string,
      icon: route.meta?.icon as string,
      to: route.path,
      tooltip: route.meta?.title as string,
    }));
};
