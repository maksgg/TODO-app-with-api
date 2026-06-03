<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

import { LanguageSelector } from "@/features/i18n/index";
import { useThemeStore } from "@/shared/stores/useThemeStore";
import { VAnimatedBackground } from "@/shared/ui/index";

const themeStore = useThemeStore();

onMounted(() => document.documentElement.setAttribute("data-theme", "dark"));
onUnmounted(() => document.documentElement.setAttribute("data-theme", themeStore.currentTheme));
</script>

<template>
  <LanguageSelector class="z-20 self-end m-6" />
  <VAnimatedBackground />
  <main class="relative z-10 flex flex-1 justify-center items-center w-full">
    <RouterView />
  </main>
</template>
