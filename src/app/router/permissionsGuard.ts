import type { RouteLocationNormalized } from "vue-router";

import { useAuthStore } from "@/shared/stores/useAuthStore";

export const permissionGuard = (to: RouteLocationNormalized) => {
  const authStore = useAuthStore();
  const requiredPermission = to.meta.permission as string | undefined;

  if (!requiredPermission) return;

  const userPermissions = authStore.userData?.permissions || [];
  const hasAccess = userPermissions.includes(requiredPermission);

  if (!hasAccess) {
    if (to.name === "Dashboard") {
      return { name: "profile" };
    }

    return { name: "Dashboard" };
  }
};
