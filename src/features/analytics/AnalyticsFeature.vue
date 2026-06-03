<script setup lang="ts">
import { PieChart, BarChart, LineChart } from "echarts/charts";
import {
  LegendComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TitleComponent,
} from "echarts/components";
import { use } from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import { computed, onMounted, provide, ref } from "vue";
import { THEME_KEY } from "vue-echarts";
import { useI18n } from "vue-i18n";

import useAnalyticsRequests from "@/features/analytics/api/useAnalyticsRequests";
import {
  DailyActivityAnalitycs,
  PriorityAnalytics,
  SummaryAnalitycs,
  TagsAnalytics,
} from "@/features/analytics/components/index";
import { getDateParams } from "@/features/analytics/utils/tasksAnalitycsByPeriod";
import { useThemeStore } from "@/shared/stores/useThemeStore";
import { VToggleTabs } from "@/shared/ui/index";

const activeTab = ref<"week" | "month">("week");
const tagsLimit = ref({ id: "5", label: "Top 5" });

const { t } = useI18n();

const analitycstTabs = computed(() => [
  { id: "week", label:  t("analitycs.tabs.week") },
  { id: "month", label: t("analitycs.tabs.month") },
]);
const limitOptions = computed(() => [
  { id: "5", label: t("analitycs.tabs.top_5") },
  { id: "10", label: t("analitycs.tabs.top_10") },
  { id: "15", label: t("analitycs.tabs.top_15") },
]);

const themeStore = useThemeStore();
const {
  fetchSummaryAnalytics,
  fetchTagsAnalytics,
  fetchPriorityAnalytics,
  fetchDailyActivityAnalytics,
} = useAnalyticsRequests();

const {
  data: summaryAnalytics,
  loading: summaryAnalyticsLoader,
  execute: getSummaryAnalytics,
} = fetchSummaryAnalytics();
const {
  data: tagsAnalytics,
  loading: tagsAnalyticsLoader,
  execute: getTagsAnalytics,
} = fetchTagsAnalytics({
  params: () => ({ limit:  tagsLimit.value.id }),
  watch: tagsLimit,
});
const {
  data: priorityAnalytics,
  loading: priorityAnalyticsLoader,
  execute: getPriorityAnalytics,
} = fetchPriorityAnalytics();
const {
  data: dailyActivityAnalytics,
  loading: dailyActivityAnalyticsLoader,
  execute: getDailyActivityAnalytics,
} = fetchDailyActivityAnalytics({
  watch: activeTab,
  params: () => getDateParams(activeTab.value),
});

provide(THEME_KEY, () => themeStore.currentTheme);
use([
  SVGRenderer,
  PieChart,
  BarChart,
  LineChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  DatasetComponent,
  LegendComponent,
]);

const loadData = async () => {
  await Promise.all([
    getSummaryAnalytics(),
    getTagsAnalytics(),
    getPriorityAnalytics(),
    getDailyActivityAnalytics(),
  ]);
};

onMounted(() => loadData());
</script>

<template>
  <Teleport
    to="#header-action"
    defer
  >
    <VToggleTabs
      v-model="activeTab"
      :options="analitycstTabs"
    />
  </Teleport>
  <div class="grid grid-cols-5 gap-6 pb-2 min-h-0 w-full overflow-auto no-scrollbar">
    <SummaryAnalitycs
      :data="summaryAnalytics"
      :loader="summaryAnalyticsLoader"
      class="col-span-5"
    />
    <DailyActivityAnalitycs
      :data="dailyActivityAnalytics"
      :loader="dailyActivityAnalyticsLoader"
      :theme="themeStore.currentTheme"
      :current-tab="activeTab"
      class="col-span-5"
    />
    <TagsAnalytics
      v-model="tagsLimit"
      :limit-options="limitOptions"
      :data="tagsAnalytics"
      :loader="tagsAnalyticsLoader"
      :theme="themeStore.currentTheme"
      class="col-span-3"
    />
    <PriorityAnalytics
      :data="priorityAnalytics"
      :loader="priorityAnalyticsLoader"
      :theme="themeStore.currentTheme"
      class="col-span-2"
    />
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none; /* Для Chrome, Safari та Opera */
}

.no-scrollbar {
  -ms-overflow-style: none;  /* Для Internet Explorer та Edge */
  scrollbar-width: none;  /* Для Firefox */
}
</style>
