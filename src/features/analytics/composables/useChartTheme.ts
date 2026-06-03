import { computed, MaybeRefOrGetter, toValue } from "vue";

import { getThemeColor } from "@/features/analytics/utils/getThemeColor";

export function useChartTheme(theme: MaybeRefOrGetter<string>) {
  const chartTheme = computed(() => {
    toValue(theme);

    return {
      primary: getThemeColor("primary"),
      success: getThemeColor("success"),
      warning: getThemeColor("warning"),
      dangerous: getThemeColor("dangerous"),
      muted: getThemeColor("txt-muted-light"),
      secondaryBgLight: getThemeColor("secondary-bg-light"),
      border: getThemeColor("border-default"),
      bg: getThemeColor("primary-bg"),
      font: "Inter, sans-serif",
    };
  });

  const loadingOptions = computed(() => {
    const { primary, muted } = chartTheme.value;

    return {
      text: "Loading...",
      color: primary,
      textColor: muted,
      maskColor: toValue(theme) === "dark" ? "rgba(31, 41, 55, 0.7)" : "rgba(255, 255, 255, 0.7)",
      zlevel: 0,
      fontSize: 14,
      showSpinner: true,
      spinnerRadius: 15,
      lineWidth: 3,
    };
  });

  return { chartTheme, loadingOptions };
}
