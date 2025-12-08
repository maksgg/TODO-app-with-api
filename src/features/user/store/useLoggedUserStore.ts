import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

import useUserRequest from "@/features/user/api/useUserRequest";
import type { UserProfileData } from "@/features/user/types/index";
import { tokenManager } from "@/shared/api/tokenManager";

export const useUserStore = defineStore("user", () => {
  const userData = ref<UserProfileData | null>(null);

  const { fetchOwnProfile } = useUserRequest();

  const { data, loading, execute } = fetchOwnProfile();

  const mountUser = async () => {
    if (!userData.value) {
      await execute();

      userData.value = data.value;
    }
  };

  const router =  useRouter();

  const logOutUser = (): void => {
    tokenManager.clearTokens();
    userData.value = null;
    router.push("/login");
  };

  return {
    userData,
    loading,
    logOutUser,
    mountUser,
  };
});
