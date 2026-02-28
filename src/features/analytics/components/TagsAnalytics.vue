<script setup lang="ts">
import { EChartsOption } from "echarts";
import { computed } from "vue";
import VChart from "vue-echarts";

import { useChartTheme } from "../composables/useChartTheme";
import type { TagsResponse } from "../types";

import VContainer from "@/shared/ui/common/VContainer.vue";
import VSkeleton from "@/shared/ui/common/VSkeleton.vue";
import VTabs from "@/shared/ui/common/VTabs.vue";
import VTitle from "@/shared/ui/common/VTitle.vue";

const {
  data = [],
  limitOptions,
  loader = false,
  theme = "light",
} = defineProps<{
  data: TagsResponse[] | null;
  limitOptions: { id: string, label: string }[] ;
  loader: boolean;
  theme: "light" | "dark";
}>();

const limit = defineModel<{ id: string; label: string; }>();

const { chartTheme, loadingOptions } = useChartTheme(() => theme);
const tagsOption = computed<EChartsOption>(() => {
  const { muted, font, primary, border, bg } = chartTheme.value;

  return {
    animation: false,
    backgroundColor: "transparent",
    grid: {
      left: "0",
      right: "0",
      bottom: "5%",
      top: "0%",
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: bg,
      borderWidth: 0,
    },
    dataset: { source: [...(data || [])].sort((a, b) => a.count - b.count) },
    xAxis: {
      type: "value",
      splitLine: { lineStyle: { color: border } },
      axisLabel: { color: muted, fontFamily: font },
    },
    yAxis: {
      type: "category",
      axisLabel: { color: muted, fontFamily: font },
      axisLine: { lineStyle: { color: border } },
    },
    series: [
      {
        type: "bar",
        encode: { x: "count", y: "tag" },
        itemStyle: {
          color: primary,
          borderRadius: [0, 5, 5, 0],
        },
        barWidth: "40%",
      },
    ],
  };
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <VTitle :title="$t('analytics.title.tags_popularity')" />
    <VContainer class="shadow-customShadow">
      <VTabs
        v-model="limit.id"
        :tabs="limitOptions"
        :disabled="loader"
        class="mb-4"
      />
      <div
        v-if="!data && loader"
        class="flex flex-col gap-7 w-full"
      >
        <VSkeleton
          v-for="tag in 7"
          :key="`summary-${tag}`"
          width="100%"
          height="26"
        />
      </div>
      <VChart
        v-if="data"
        :option="tagsOption"
        :autoresize="true"
        :loading="loader"
        :loading-options="loadingOptions"
        class="h-[23rem]"
      />
    </VContainer>
  </div>
</template>
