import { i18n } from "@/shared/composables/useI18n";

export const dateFormatterIntoOneWord = (dateStr: string | null): string => {
  if (!dateStr) return "";

  const { t } = i18n.global;

  const date = new Date(dateStr);
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffTime = startOfDate.getTime() - startOfToday.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return t("tasks.dates.overdue");
  if (diffDays === 0) return t("tasks.dates.today");
  if (diffDays === 1) return t("tasks.dates.tomorrow");

  if (diffDays > 1 && diffDays <= 7) return t("tasks.dates.this_week");
  if (diffDays > 7 && diffDays <= 14) return t("tasks.dates.next_week");

  return t("tasks.dates.later");
};
