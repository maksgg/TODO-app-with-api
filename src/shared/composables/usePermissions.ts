import { computed } from "vue";
import type { RouteRecordRaw } from "vue-router";

import { useAuthStore } from "@/shared/stores/useAuthStore";
import type { SidebarLink } from "@/shared/types";

export const usePermissions = () => {
  const userStore = useAuthStore();

  // 1. Оригінальна логіка (незмінна)
  const userPermissions = computed(() => userStore.userData?.permissions || []);
  const isAllowed = (permission: string) => userPermissions.value.includes(permission);

  // 2. Допоміжна внутрішня логіка для перевірки доступу до роуту
  const hasRouteAccess = (route: RouteRecordRaw): boolean => {
    const required = route.meta?.permission as string;
    if (!required) return true;
    return isAllowed(required);
  };

  // 3. Новий метод для фільтрації та форматування роутів
  const getSidebarLinks = (allRoutes: RouteRecordRaw[]): SidebarLink[] => {
    return allRoutes
      .filter((route) => {
        const isNavigable = route.meta?.icon && !route.path.includes(":");
        return isNavigable && hasRouteAccess(route);
      })
      .map((route) => ({
        title: route.meta?.title as string,
        icon: route.meta?.icon as string,
        to: route.path,
        tooltip: route.meta?.title as string,
      }));
  };

  return {
    isAllowed,
    getSidebarLinks, // Додаємо новий метод
    userPermissions,  // Можна теж експортувати, якщо знадобиться
  };
};
