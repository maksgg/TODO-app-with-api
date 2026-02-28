<script setup lang="ts">
import { EChartsOption } from "echarts";
import { computed } from "vue";
import VChart from "vue-echarts";
import { useI18n } from "vue-i18n";

import { useChartTheme } from "../composables/useChartTheme";
import { DailyActivityResponse } from "../types";

import VContainer from "@/shared/ui/common/VContainer.vue";
import VSkeleton from "@/shared/ui/common/VSkeleton.vue";
import VTitle from "@/shared/ui/common/VTitle.vue";
import { firstLetterUp } from "@/shared/utils";

const {
  data = [],
  loader = false,
  theme = "light",
  currentTab = "week",
} = defineProps<{
  data: DailyActivityResponse[] | null;
  loader: boolean;
  theme: "light" | "dark";
  currentTab: "week" | "month"
}>();

const { t, locale } = useI18n();
const { chartTheme, loadingOptions } = useChartTheme(() => theme);
const dailyOption = computed<EChartsOption>(() => {
  const { primary, success, muted, border, font, bg } = chartTheme.value;

  const created = t("analytics.chart.created");
  const completed = t("analytics.chart.completed");
  return {
    animation: false,
    backgroundColor: "transparent",
    grid: {
      left: "0",
      right: "0",
      bottom: "5%",
      top: "16%",
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: bg,
      borderWidth: 0,
    },
    legend: { data: [created, completed], top: 0, left: "left" },
    dataset: {
      source: data || [],
    },
    xAxis: {
      type: "category",
      axisLabel: {
        color: muted,
        fontFamily: font,
        interval: currentTab === "month" ? 4 : 0,
        formatter: (value: string) => currentTab === "week" ?
          firstLetterUp(new Date(value).toLocaleDateString(locale.value, { weekday: "short" })) :
          value.split("-").slice(1).join("/"),
      },
      axisLine: { lineStyle: { color: border } },
    },
    yAxis: {
      splitLine: { lineStyle: { color: border } },
      axisLabel: { color: muted, fontFamily: font },
    },
    series: [
      {
        name: created,
        type: "line",
        smooth: true,
        lineStyle: { width: 3, color: primary },
        encode: { x: "date", y: "created" },
        itemStyle: { color: primary },
      },
      {
        name: completed,
        type: "line",
        smooth: true,
        lineStyle: { width: 3, color: success },
        encode: { x: "date", y: "completed" },
        itemStyle: { color: success },
      },
    ],
  };
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <VTitle :title="$t('analytics.title.task_completion')" />
    <VContainer class="shadow-customShadow">
      <div
        v-if="!data && loader"
        class="flex flex-col gap-7 w-full"
      >
        <VSkeleton
          v-for="daily in 6"
          :key="`summary-${daily}`"
          width="100%"
          height="25"
        />
      </div>
      <VChart
        v-if="data"
        :option="dailyOption"
        :autoresize="true"
        :loading="loader"
        :loading-options="loadingOptions"
        class="h-[20rem]"
      />
    </VContainer>
  </div>
</template>
