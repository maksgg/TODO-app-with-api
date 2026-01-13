<script setup lang="ts">
import { computed, onMounted } from "vue";

import { useThemeStore } from "@/features/theme/store/useThemeStore";
import VSwitch from "@/shared/ui/common/VSwitch.vue";
import SwitchSunIcon from "@/shared/ui/icons/SwitchSunIcon.vue";
import ThemeMoonIcon from "@/shared/ui/icons/ThemeMoonIcon.vue";

const themeStore = useThemeStore();

const theme = computed<boolean>({
  get: () => themeStore.currentTheme === "dark",
  set: (newValue: boolean) => themeStore.setTheme(newValue ? "dark" : "light"),
});
onMounted(themeStore.initTheme);
</script>

<template>
  <VSwitch
    id="theme"
    v-model="theme"
    variant="custom"
  >
    <template #custom-switch="{ checked }">
      <div
        :class="[
          `rounded-2xl border relative transition-all duration-300
          bg-themeSwitchBg bg-cover bg-center w-[60px] h-[32px]`,
          !checked ?
            `border-none` :
            'border-themeSwitchBorder'
        ]"
      >
        <div
          :class="[
            'absolute top-1/2 -translate-y-1/2 transition-all duration-300',
            checked ? 'left-2' : 'left-[calc(100%-35%)]'
          ]"
        >
          <SwitchSunIcon v-if="!checked" />
          <ThemeMoonIcon v-else />
        </div>
        <div
          :class="[
            `absolute top-1/2 -translate-y-1/2 rounded-full shadow-themeSwitchShadow w-[26px]
            h-[26px] flex items-center justify-center transition-all duration-300 bg-themeSwitch`,
            !checked ? 'left-[3px]' : 'left-[calc(100%-3px)] -translate-x-full'
          ]"
        />
      </div>
    </template>
  </VSwitch>
</template>
