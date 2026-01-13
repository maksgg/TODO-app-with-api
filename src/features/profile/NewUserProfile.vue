<script setup lang="ts">
import { toast } from "vue-sonner";

import useProfileRequests from "./api/useProfileRequests";
import ProfileDetails from "./components/ProfileDetails.vue";
import ProfileOverview from "./components/ProfileOverview.vue";

import { useAuthStore } from "@/shared/stores/useAuthStore";
import { UserInfo } from "@/shared/types";

const authStore = useAuthStore();

const { updateOwnProfile } = useProfileRequests();

const { loading, execute } = updateOwnProfile({
  onSuccess: ({ data }) => {
    authStore.userData = { ...authStore.userData, ...data };
    toast.success("Profile is successful updated");
  },
});

const updateProfile = async (payload: Partial<UserInfo>) => await execute({ data: payload });
</script>

<template>
  <div class="flex flex-col flex-1 gap-5 px-12 pt-6 pb-2">
    <ProfileOverview
      :user-data="authStore.userData"
    />
    <ProfileDetails
      :user-data="authStore.userData"
      :loader="loading"
      @update-user-data="updateProfile"
    />
    <h2 class="text-3xl">
      Change password is coming soon...
    </h2>
  </div>
</template>
