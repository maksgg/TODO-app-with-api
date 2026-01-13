import type { RouteLocationNormalized } from "vue-router";

import { tokenManager  } from "@/shared/api/tokenManager";
import { useAuthStore } from "@/shared/stores/useAuthStore";

export const authGuard = async (to: RouteLocationNormalized) => {
  const token = tokenManager.getAccessToken();
  const isAuthorized = !!token;
  const useStore = useAuthStore();

  if (isAuthorized && !useStore.userData) {
    await useStore.setUser();
  }

  const userRole = useStore.userData?.role;

  if (to.meta.requiredAuth && !isAuthorized) {
    return { name: "auth" };
  }

  if (to.name === "auth" && isAuthorized) {
    return { name: "home" };
  }

  if (to.meta.role === "admin" && userRole !== "admin") {
    return { name: "home" };
  }
};
