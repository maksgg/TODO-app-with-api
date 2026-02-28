import { computed } from "vue";
import { useI18n } from "vue-i18n";

export default () => {
  const { t } = useI18n();
  const dayNames = computed(() => [
    t("tasks.calendar.days.mon"),
    t("tasks.calendar.days.tue"),
    t("tasks.calendar.days.wed"),
    t("tasks.calendar.days.thu"),
    t("tasks.calendar.days.fri"),
    t("tasks.calendar.days.sat"),
    t("tasks.calendar.days.sun"),
  ]);

  const monthNames = computed(() => [
    t("tasks.calendar.months.jan"),
    t("tasks.calendar.months.feb"),
    t("tasks.calendar.months.mar"),
    t("tasks.calendar.months.apr"),
    t("tasks.calendar.months.may"),
    t("tasks.calendar.months.jun"),
    t("tasks.calendar.months.jul"),
    t("tasks.calendar.months.aug"),
    t("tasks.calendar.months.sep"),
    t("tasks.calendar.months.oct"),
    t("tasks.calendar.months.nov"),
    t("tasks.calendar.months.dec"),
  ]);

  return {
    dayNames,
    monthNames,
  };
};
