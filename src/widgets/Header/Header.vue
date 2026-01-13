<script setup lang="ts">
import LanguageSelector from "@/features/i18n/components/LanguageSelector.vue";
import ThemeToggle from "@/features/theme/components/ThemeToggle.vue";
</script>

<template>
  <header class="flex justify-end w-full">
    <div class="flex items-center gap-10 pr-5 pt-5">
      <LanguageSelector />
      <ThemeToggle />
    </div>
  </header>
</template>
