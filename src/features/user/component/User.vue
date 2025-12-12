<script setup lang="ts">
import { useUserStore } from "@/features/user/store/useLoggedUserStore";
import VButton from "@/shared/ui/common/VButton.vue";

const useStore = useUserStore();
</script>

<template>
  <div class="flex justify-center items-center self-start w-[80vw] gap-5 border border-red-500 ">
    <span class="text-text-color">
      Search Bar + User
    </span>
    <div
      class="flex justify-center items-center w-[5rem] h-[5rem] text-text-color
          border rounded-[50%]"
    >
      Avatar
    </div>
    <div
      v-if="useStore.userData"
      class="flex flex-col justify-center items-center gap-3 text-text-color"
    >
      <span>{{ useStore.userData.name }}</span>
    </div>
    <VButton
      text="Logout"
      size="fit"
      icon="log-out"
      @click="useStore.logOutUser"
    />
  </div>
</template>
