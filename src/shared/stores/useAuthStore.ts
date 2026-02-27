import { tokenManager, type UseApiOptions, useApiGet } from "@ametie/vue-muza-use";
import { defineStore } from "pinia";
import { toValue } from "vue";
import { RouteRecordRaw, useRouter } from "vue-router";

import type { SidebarLink, UserInfo } from "@/shared/types/index";

export const useAuthStore = defineStore("user", () => {
  const fetchOwnProfile = (options?: UseApiOptions<UserInfo>) => {
    return useApiGet("/me", options);
  };

  const { data: userData, loading, execute } = fetchOwnProfile();

  const setUser = async () => {
    if (userData.value || !tokenManager.getAccessToken()) return;

    await execute();
    return userData.value ;
  };

  const router =  useRouter();

  const isAllowed = (permission: string) => userData.value?.permissions.includes(permission);

  const getSidebarLinks = (allRoutes: RouteRecordRaw[]): SidebarLink[] => {
    return allRoutes
      .filter((route) => {
        const isNavigable = route.meta?.icon && !route.path.includes(":");
        const required = route.meta?.permission as string;
        const hasAccess = !required || isAllowed(required);

        return isNavigable && hasAccess;
      })
      .map((route) => ({
        title: toValue(route.meta?.title) as string,
        icon: route.meta?.icon as string,
        to: route.path,
        tooltip: route.meta?.title as string,
      }));
  };

  const isAdmin = () => userData.value?.role === "admin" ? router.push("/users") : router.push("/");

  const logOutUser = (): void => {
    tokenManager.clearTokens();
    userData.value = null;
    router.push("/auth");
  };

  return {
    userData,
    loading,
    isAdmin,
    setUser,
    logOutUser,
    isAllowed,
    getSidebarLinks,
  };
});
