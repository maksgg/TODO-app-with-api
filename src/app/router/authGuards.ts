import type { RouteLocationNormalized } from "vue-router";

import { tokenManager  } from "@/shared/api/tokenManager";

export const authGuard = (
  to: RouteLocationNormalized,
) => {
  const token = tokenManager.getAccessToken();
  const isAuthorized = !!token;

  if (to.meta.requiredAuth && !isAuthorized) {
    return { name: "login" };
  }

  if (to.meta.guestOnly && isAuthorized) {
    return { name: "home" };
  }
  return;
};
