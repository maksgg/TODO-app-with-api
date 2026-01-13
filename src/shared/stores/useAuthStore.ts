import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

import type { UseApiOptions } from "../api";
import { useApiGet } from "../composables";

import { tokenManager } from "@/shared/api/tokenManager";
import type { UserInfo } from "@/shared/types/index";

export const useAuthStore = defineStore("user", () => {
  const userData = ref<UserInfo | null>(null);

  const fetchOwnProfile = (options?: UseApiOptions<UserInfo>) => {
    return useApiGet("/me", options);
  };

  const { data: user, loading, execute } = fetchOwnProfile();

  const getUser = async () => {
    await execute();

    if (user.value) {
      userData.value = user.value;
    }
  };

  const setUser = async () => {
    if (userData.value) return;

    await getUser();
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
    getUser,
    logOutUser,
  };
});
