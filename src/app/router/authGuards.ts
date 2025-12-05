import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const token = localStorage.getItem("accessToken");
  const isAuthorized = !!token;

  if (to.meta.requiredAuth && !isAuthorized) {
    return next("/login");
  }
  return next();
};
