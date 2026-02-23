<script setup lang="ts">
import { ref, computed } from "vue";

import { UserInfo } from "@/shared/types";
import VButton from "@/shared/ui/common/VButton.vue";
import VInput from "@/shared/ui/common/VInput.vue";
import VTitle from "@/shared/ui/common/VTitle.vue";

const { userData, loader } = defineProps<{
  userData: UserInfo | null;
  loader: boolean;
}>();

const formField = ref({
  name: userData?.name || "",
});

const isChanged = computed(() => formField.value.name !== userData?.name);

const emit = defineEmits<{ "updateUserData": [Partial<UserInfo>] }>();

const updateUser = () => emit("updateUserData", formField.value);
</script>

<template>
  <VTitle title="Account Details" />
  <div class="border border-borderDefault bg-secondaryBg rounded-lg p-6">
    <form
      class="flex flex-col gap-5 max-w-[30rem]"
      @submit.prevent="updateUser"
    >
      <VInput
        v-model="formField.name"
        label="Full Name"
      />
      <VButton
        text="Save Changes"
        :loader="loader"
        :disabled="!isChanged"
        type="submit"
      />
    </form>
  </div>
</template>
