<script setup lang="ts">
import { useUserStore } from "@/features/user/store/useLoggedUserStore";
import VButton from "@/shared/ui/common/VButton.vue";

const useStore = useUserStore();
</script>

<template>
  <div class="flex flex-col justify-center items-center w-[20rem] gap-5">
    <div
      class="flex justify-center items-center w-[12rem] h-[12rem] text-text-color
          border rounded-[50%]"
    >
      Avatar
    </div>
    <div
      v-if="useStore.userData"
      class="flex flex-col justify-center items-center gap-3 text-text-color"
    >
      <span>{{ useStore.userData.name }}</span>
      <span>{{ useStore.userData.email }}</span>
    </div>
    <VButton
      text="Logout"
      size="fit"
      icon="log-out"
      @click="useStore.logOutUser"
    />
  </div>
</template>
