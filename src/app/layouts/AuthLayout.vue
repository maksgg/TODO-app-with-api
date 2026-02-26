<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

import LanguageSelector from "@/features/i18n/components/LanguageSelector.vue";
import { useThemeStore } from "@/shared/stores/useThemeStore";

const themeStore = useThemeStore();

onMounted(() => document.documentElement.setAttribute("data-theme", "dark"));
onUnmounted(() => document.documentElement.setAttribute("data-theme", themeStore.currentTheme));
</script>

<template>
  <LanguageSelector class="self-end m-6" />
  <main class="relative flex flex-1 justify-center items-center w-full">
    <RouterView />
  </main>
</template>
