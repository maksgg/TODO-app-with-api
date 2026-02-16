<script setup lang="ts">
import { computed } from "vue";

import { routes } from "@/app/router/index";
import { usePermissions } from "@/shared/composables/usePermissions";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import VLoader from "@/shared/ui/common/VLoader.vue";
import Header from "@/widgets/Header/Header.vue";
import Sidebar from "@/widgets/Sidebar/Sidebar.vue";

const authStore = useAuthStore();
const { getSidebarLinks } = usePermissions();

const menuItems = computed(() => getSidebarLinks(routes));
</script>

<template>
  <div
    v-if="false && (authStore.loading || !authStore.userData)"
    class="flex flex-1 items-center justify-center min-h-screen"
  >
    <VLoader size="lg" />
  </div>
  <main
    v-else
    class="relative flex flex-1 w-full h-screen bg-primaryBg"
  >
    <Sidebar :links="menuItems" />
    <div class="flex flex-col gap-6 mx-12 my-6 w-full">
      <Header />
      <RouterView />
    </div>
  </main>
</template>
