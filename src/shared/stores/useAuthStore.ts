import { tokenManager, type UseApiOptions, useApiGet } from "@ametie/vue-muza-use";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

import type { UserInfo } from "@/shared/types/index";

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

  const logOutUser = (): void => {
    tokenManager.clearTokens();
    userData.value = null;
    router.push("/auth");
  };

  const isAdmin = () => userData.value?.role === "admin" ? router.push("/users") : router.push("/");

  return {
    userData,
    loading,
    isAdmin,
    setUser,
    logOutUser,
  };
});
