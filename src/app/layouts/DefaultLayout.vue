<script setup lang="ts">
import { onMounted } from "vue";

import { useAuthStore } from "@/shared/stores/useAuthStore";
import VLoader from "@/shared/ui/common/VLoader.vue";
import Sidebar from "@/widgets/Sidebar/Sidebar.vue";

const useStore = useAuthStore();

onMounted(useStore.setUser);
</script>

<template>
  <VLoader
    v-if="useStore.loading"
    size="lg"
  />
  <main
    v-else
    class="relative flex flex-1 gap-3 w-full"
  >
    <Sidebar />
    <RouterView />
  </main>
</template>
