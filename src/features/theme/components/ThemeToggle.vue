<script setup lang="ts">
import { computed } from "vue";

import { useThemeStore } from "@/features/theme/store/useThemeStore";
import VSwitch from "@/shared/ui/common/VSwitch.vue";

const themeStore = useThemeStore();

const isDarkTheme = computed({
  get() {
    return themeStore.currentTheme === "dark";
  } ,
  set (newValue: boolean) {
    themeStore.setTheme(newValue ? "dark" : "light");
  },
});
</script>

<template>
  <VSwitch v-model="isDarkTheme">
    <template #theme-icon>
      <VueFeather
        :type="themeStore.isDark ? 'moon' : 'sun'"
        :class="themeStore.isDark ? 'text-blue-500 w-5 h-5' : 'w-5 h-5'"
      />
    </template>
    <template #default>
      {{ themeStore.isDark ? themeStore.label = "Dark theme" : themeStore.label = "Light theme" }}
    </template>
  </VSwitch>
</template>
