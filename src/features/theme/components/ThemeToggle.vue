<script setup lang="ts">
import { computed } from "vue";

import { useThemeStore } from "@/shared/stores/useThemeStore";
import VSwitch from "@/shared/ui/common/VSwitch.vue";
import SwitchSunIcon from "@/shared/ui/icons/SwitchSunIcon.vue";
import ThemeMoonIcon from "@/shared/ui/icons/ThemeMoonIcon.vue";

const themeStore = useThemeStore();

const theme = computed<boolean>({
  get: () => themeStore.isDark,
  set: (newValue: boolean) => themeStore.setTheme(newValue ? "dark" : "light"),
});
</script>

<template>
  <VSwitch
    id="theme"
    v-model="theme"
    variant="custom"
  >
    <template #custom-switch="{ checked }">
      <div
        class="relative h-[32px] w-[60px] rounded-2xl
        transition-all ease-in-out overflow-hidden bg-themeSwitchGradient border
        border-themeSwitchBorder"
      >
        <div
          class="absolute top-1/2 -translate-y-1/2 transition-all duration-300"
          :class="checked ? 'left-2' : 'left-[calc(100%-35%)]'"
        >
          <SwitchSunIcon v-if="checked" />
          <ThemeMoonIcon v-else />
        </div>

        <div
          class="absolute top-1/2 -translate-y-1/2 rounded-full
          shadow-themeMorph w-[26px] h-[26px] flex items-center
           justify-center transition-all ease-in-out bg-thumb"
          :class="!checked ? 'left-[3px]' : 'left-[calc(100%-3px)] -translate-x-full'"
        >
          <SwitchSunIcon v-if="!checked" />
          <ThemeMoonIcon v-else />
        </div>
      </div>
    </template>
  </VSwitch>
</template>
