<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import { routes } from "@/app/router/index";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import VLoader from "@/shared/ui/common/VLoader.vue";
import Header from "@/widgets/Header/Header.vue";
import Sidebar from "@/widgets/Sidebar/Sidebar.vue";

const authStore = useAuthStore();
const route = useRoute();
const menuItems = computed(() => authStore.getSidebarLinks(routes));
</script>

<template>
  <div
    v-if="authStore.loading"
    class="flex flex-1 items-center justify-center min-h-screen"
  >
    <VLoader size="lg" />
  </div>
  <main
    v-else
    class="relative flex flex-1 w-full h-screen bg-primaryBg"
  >
    <Sidebar
      v-if="route.name !== 'NotFound'"
      :links="menuItems"
    />
    <div class="flex flex-col gap-6 mx-12 my-6 w-full min-w-0">
      <Header />
      <RouterView />
    </div>
  </main>
</template>
