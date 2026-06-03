<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import AuthLayout from "@/app/layouts/AuthLayout.vue";
import DefaultLayout from "@/app/layouts/DefaultLayout.vue";
import { useThemeStore } from "@/shared/stores/useThemeStore";
import { VToast } from "@/shared/ui/index";

const route = useRoute();
const themeStore = useThemeStore();

const layouts = {
  auth: AuthLayout,
  default: DefaultLayout,
};

const routePath = computed(() => {
  const layoutKey = (route.meta.layout || "default") as keyof typeof layouts;

  return layouts[layoutKey];
});
</script>

<template>
  <div class="relative flex flex-col w-full h-screen overflow-hidden">
    <VToast :theme="themeStore.currentTheme" />
    <component :is="routePath" />
  </div>
</template>
