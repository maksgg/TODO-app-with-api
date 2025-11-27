<script setup lang="ts">
import { computed } from "vue";

import { useThemeStore } from "../composables/useTheme";

const themeStore = useThemeStore();

const isDark = computed(() => themeStore.isDark);

const toggleTheme = () => {
  themeStore.setTheme(isDark.value ? "light" : "dark");
};
</script>

<template>
  <button
    class="theme-toggle"
    :aria-label="isDark ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'"
    @click="toggleTheme"
  >
    <span v-if="isDark">🌙</span>
    <span v-else>☀️</span>
  </button>
</template>

<style scoped>
.theme-toggle {
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: transparent;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1.25rem;
}

.theme-toggle:hover {
  background: #f3f4f6;
}

.theme-toggle:active {
  transform: scale(0.95);
}
</style>

