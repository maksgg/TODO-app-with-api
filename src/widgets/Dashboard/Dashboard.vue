<script setup lang="ts">
import LanguageSelector from "@/features/i18n/components/LanguageSelector.vue";
import ThemeToggle from "@/features/theme/components/ThemeToggle.vue";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import VHeader from "@/shared/ui/common/VHeader.vue";

const useStore = useAuthStore();
</script>

<template>
  <VHeader :title="`Good to see you again, ${useStore.userData.name}`">
    <template #actions>
      <div class="flex gap-6 p-2">
        <ThemeToggle />
        <LanguageSelector />
      </div>
    </template>
  </VHeader>
  <div>
    Dashboard coming soon...
  </div>
</template>
