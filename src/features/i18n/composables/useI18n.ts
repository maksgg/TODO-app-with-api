import { createI18n, useI18n } from "vue-i18n";

import en from "@/features/i18n/locales/en.json";
import ua from "@/features/i18n/locales/ua.json";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "ua",
  globalInjection: true,
  messages: {
    ua,
    en,
  },
});

export const useLanguages = () => {
  const { locale } = useI18n();
  const languages = {
    options: [{ name: "EN", value: "en", label: "English" }, { name: "UA", value: "ua", label: "Ukrainian" }],
  };

  return {
    locale,
    languages,
  };
};
