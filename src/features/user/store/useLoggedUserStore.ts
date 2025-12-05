import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

import useUserRequest from "@/features/user/api/useUserRequest";
import type { UserProfileData } from "@/features/user/types/index";

export const useUserStore = defineStore("user", () => {
  const userData = ref<UserProfileData | null>(null);

  const { fetchOwnProfile } = useUserRequest();

  const { data, loading, execute } = fetchOwnProfile();

  const mountUser = async () => {
    if (!userData.value) {
      await execute();

      if (data.value) {
        const { name, email } = data.value;

        setUser(name, email);
      }
    }
    return;
  };

  const setUser = (name: string, email: string): UserProfileData => {
    return userData.value = { name, email };
  };

  const router =  useRouter();

  const logOutUser = (): void => {
    localStorage.removeItem("accessToken");
    userData.value = null;
    router.push("/login");
  };

  return {
    userData,
    loading,
    logOutUser,
    setUser,
    mountUser,
  };
});
