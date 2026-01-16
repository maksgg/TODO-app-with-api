<script setup lang="ts">
import { onMounted } from "vue";

import { useAuthStore } from "@/shared/stores/useAuthStore";
import VLoader from "@/shared/ui/common/VLoader.vue";
import Sidebar from "@/widgets/Sidebar/Sidebar.vue";

const useStore = useAuthStore();

onMounted(useStore.setUser);
</script>

<template>
  <div
    v-if="useStore.loading"
    class="flex flex-1 items-center justify-center min-h-screen"
  >
    <VLoader size="lg" />
  </div>
  <main
    v-else
    class="relative flex flex-1 w-full"
  >
    <Sidebar />
    <RouterView />
  </main>
</template>
