import { watch } from "vue";
import { createI18n, useI18n } from "vue-i18n";

import en from "@/features/i18n/locales/en.json";
import ua from "@/features/i18n/locales/uk.json";

const savedLocale = localStorage.getItem("locale") || window.navigator.language.split("-")[0];
const initialLocale = ["en", "ua"].includes(savedLocale) ? savedLocale : "en";

export const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
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

  watch(locale, (newLocale) => {
    localStorage.setItem("locale", newLocale);
  });

  return {
    languages,
    locale,
  };
};
