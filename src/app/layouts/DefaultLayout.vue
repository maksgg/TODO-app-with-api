<script setup lang="ts">
import { onMounted } from "vue";

import { useUserStore } from "@/features/user/store/useLoggedUserStore";
import VLoader from "@/shared/ui/common/VLoader.vue";

const useStore = useUserStore();

onMounted(useStore.mountUser);
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-primary gap-5">
    <VLoader
      v-if="useStore.loading"
      size="lg"
    />
    <div
      v-else
      class="flex flex-col-reverse justify-center items-center gap-5 h-screen"
    >
      <RouterView />
      <slot />
    </div>
  </div>
</template>
