<script setup lang="ts">
import { onMounted } from "vue";

import { useUserStore } from "@/features/user/store/useLoggedUserStore";
import VLoader from "@/shared/ui/common/VLoader.vue";

const useStore = useUserStore();

onMounted(useStore.mountUser);
</script>

<template>
  <VLoader
    v-if="useStore.loading"
    size="lg"
  />
  <main
    v-else
    class="relative flex justify-center items-center gap-10"
  >
    <RouterView />
  </main>
</template>
