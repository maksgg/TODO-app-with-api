import { tokenManager } from "@ametie/vue-muza-use";
import type { RouteLocationNormalized } from "vue-router";

import { useAuthStore } from "@/shared/stores/useAuthStore";

export const authGuard = (to: RouteLocationNormalized) => {
  const token = tokenManager.getAccessToken();
  const isAuthorized = !!token;
  const useStore = useAuthStore();
  const isPublic = to.meta.requiredAuth === false;

  if (!isPublic && !isAuthorized) {
    return { name: "auth" };
  }

  if (to.name === "auth" && isAuthorized) {
    return { name: "Dashboard" };
  }

  if (to.meta.role === "admin" && useStore.userData && useStore.userData.role !== "admin") {
    return { name: "Dashboard" };
  }
};
