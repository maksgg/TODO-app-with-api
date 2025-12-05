<script setup lang="ts">
import { computed, onMounted } from "vue";

import { useThemeStore } from "@/features/theme/store/useThemeStore";
import VSwitch from "@/shared/ui/common/VSwitch.vue";

const themeStore = useThemeStore();

const theme = computed<boolean>({
  get() {
    return themeStore.currentTheme === "dark";
  } ,
  set (newValue: boolean) {
    themeStore.setTheme(newValue ? "dark" : "light");
  },
});
onMounted(themeStore.initTheme);
</script>

<template>
  <VSwitch
    id="theme"
    v-model="theme"
  >
    <template #theme-icon>
      <VueFeather
        :type="themeStore.theme ? 'moon' : 'sun'"
        :class="themeStore.theme ? 'text-blue-500 w-5 h-5' : 'w-5 h-5'"
      />
    </template>
    {{ themeStore.theme ? themeStore.label = "Dark theme" : themeStore.label = "Light theme" }}
  </VSwitch>
</template>
