<script setup lang="ts">
import { toast } from "vue-sonner";

import useProfileRequests from "./api/useProfileRequests";
import ProfileDetails from "./components/ProfileDetails.vue";

import ProfileOverview from "@/features/profile/components/ProfileOverview.vue";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import { UserInfo } from "@/shared/types";

const authStore = useAuthStore();

const { updateOwnProfile } = useProfileRequests();

const { loading, execute } = updateOwnProfile({
  onSuccess: ({ data }) => {
    authStore.userData = data;
    toast.success("Profile is successful updated");
  },
});

const updateProfile = async (payload: Partial<UserInfo>) => await execute({ data: payload });
</script>

<template>
  <ProfileOverview
    :user-data="authStore.userData"
    title=" Profile Overview"
    :loader="loading"
  />
  <ProfileDetails
    v-if="authStore.isAllowed('update:user')"
    :user-data="authStore.userData"
    :loader="loading"
    @update-user-data="updateProfile"
  />
</template>
