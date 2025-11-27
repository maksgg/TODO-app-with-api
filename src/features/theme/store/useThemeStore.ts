import { defineStore } from "pinia";
import { ref, computed } from "vue";

import { Theme } from "@/features/theme/types/index";

export const useThemeStore = defineStore("theme", () => {
  const currentTheme = ref<Theme>("light");
  const label = ref<string>("");

  const isDark = computed(():boolean => currentTheme.value === "dark");

  const initTheme = (): void => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;

    if (savedTheme) {
      return setTheme(savedTheme);
    }
  };

  const setTheme = (theme: Theme): void => {
    currentTheme.value = theme;

    updateDocumentTheme(theme);
    localStorage.setItem("theme", theme);
  };

  const toggleTheme = (): void => {
    const newTheme: Theme = currentTheme.value === "light" ? "dark" : "light";

    setTheme(newTheme);
  };

  const updateDocumentTheme = (theme: Theme): void => {
    const el = document.documentElement;

    if (theme === "dark") {
      el.setAttribute("data-theme", "dark");
    } else {
      el.setAttribute("data-theme", "light");
    }
  };
  return { /// todo consider if all this needed in future
    toggleTheme,
    updateDocumentTheme,
    initTheme,
    setTheme,
    isDark,
    currentTheme,
    label,
  };
});
