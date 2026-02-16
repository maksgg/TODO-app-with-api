<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import AuthLayout from "@/app/layouts/AuthLayout.vue";
import DefaultLayout from "@/app/layouts/DefaultLayout.vue";
import { useThemeStore } from "@/features/theme/store/useThemeStore";
import VToast from "@/shared/ui/common/VToast.vue";

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
  <div
    :class="['relative flex flex-col w-full h-screen overflow-hidden',
             routePath === AuthLayout ?
               'bg-authBg bg-cover bg-center' : 'bg-background'
    ]"
  >
    <VToast :theme="themeStore.currentTheme" />
    <component :is="routePath" />
  </div>
</template>
