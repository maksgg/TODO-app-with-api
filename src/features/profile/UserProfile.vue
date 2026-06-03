<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";

import useProfileRequests from "@/features/profile/api/useProfileRequests";
import { ProfileDetails, ProfileOverview } from "@/features/profile/components/index";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import type { UserInfo } from "@/shared/types";

const authStore = useAuthStore();
const { t } = useI18n();

const { updateOwnProfile } = useProfileRequests();

const { loading, execute } = updateOwnProfile({
  onSuccess: ({ data }) => {
    authStore.userData = data;
    toast.success(t("profile.toasts.profile_is_successful_updated"));
  },
});

const updateProfile = async (payload: Partial<UserInfo>) => await execute({ data: payload });
</script>

<template>
  <ProfileOverview
    :user-data="authStore.userData"
    :title="$t('profile.profile_overview')"
    :loader="loading"
  />
  <ProfileDetails
    :user-data="authStore.userData"
    :loader="loading"
    @update-user-data="updateProfile"
  />
</template>
