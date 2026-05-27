<script setup lang="ts">
import { ref, computed } from "vue";

import type { UserInfo } from "@/shared/types";
import VButton from "@/shared/ui/common/VButton.vue";
import VInput from "@/shared/ui/common/VInput.vue";
import VTitle from "@/shared/ui/common/VTitle.vue";

const { userData, loader } = defineProps<{
  userData: UserInfo | null;
  loader: boolean;
}>();

const formField = ref({
  name: userData?.name || "",
  email: userData?.email || "",
});

const isChanged = computed(() => formField.value.name !== userData?.name);

const emit = defineEmits<{ "updateUserData": [Partial<UserInfo>] }>();

const updateUser = () => emit("updateUserData", formField.value);
</script>

<template>
  <VTitle :title="$t('profile.account_details')" />
  <div class="border border-border-default bg-secondary-bg rounded-lg p-6">
    <form
      class="flex flex-col gap-5 max-w-120"
      @submit.prevent="updateUser"
    >
      <VInput
        v-model="formField.name"
        :label="$t('profile.full_name')"
      />
      <VInput
        v-model="formField.email"
        :label="$t('profile.email')"
        :disabled="true"
        :support-text="$t('profile.change_email_is_currently_unavailable')"
      />
      <VButton
        :text="$t('profile.save_changes')"
        :loader="loader"
        :disabled="!isChanged"
        type="submit"
      />
    </form>
  </div>
</template>
