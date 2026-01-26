import { createI18n, useI18n } from "vue-i18n";

import en from "@/features/i18n/locales/en.json";
import uk from "@/features/i18n/locales/uk.json";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "uk",
  globalInjection: true,
  messages: {
    uk,
    en,
  },
});

export const useLanguages = () => {
  const { locale } = useI18n();
  const languages = {
    label: "",
    options: [{ name: "EN", value: "en" }, { name: "UA", value: "ua" }],
  };

  return {
    locale,
    languages,
  };
};
