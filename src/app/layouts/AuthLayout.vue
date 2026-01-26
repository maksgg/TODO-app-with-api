<script setup lang="ts">
import LanguageSelector from "@/features/i18n/components/LanguageSelector.vue";

</script>

<template>
  <LanguageSelector class="self-end p-6" />
  <main class="relative flex flex-1 justify-center items-center w-full">
    <RouterView />
  </main>
</template>
