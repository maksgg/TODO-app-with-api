import { defineStore } from "pinia";

import { CurrentTheme, Theme } from "@/features/theme/types/index";

export const useThemeStore = defineStore("theme", {
  state: (): CurrentTheme => ({
    currentTheme: "light",
    label: "",
  }),
  actions: {
    setTheme(theme: Theme): void {
      this.currentTheme = theme;

      this.updateDocumentTheme(theme);
      localStorage.setItem("theme", theme);
    },
    toggleTheme(): void {
      const newTheme: Theme = this.currentTheme === "light" ? "dark" : "light";

      this.setTheme(newTheme);
    },
    updateDocumentTheme(theme: Theme): void {
      const el = document.documentElement;

      if (theme === "dark") {
        el.setAttribute("data-theme", "dark");
      } else {
        el.setAttribute("data-theme", "light");
      }
    },
    initTheme(): void {
      const savedTheme = localStorage.getItem("theme") as Theme | null;

      this.setTheme(savedTheme);
    },
  },
  getters: {
    isDark(): boolean {
      return this.currentTheme === "dark";
    },
  },
});
