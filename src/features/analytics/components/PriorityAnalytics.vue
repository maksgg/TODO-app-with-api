<script setup lang="ts">
import { EChartsOption } from "echarts";
import { computed } from "vue";
import VChart from "vue-echarts";

import { useChartTheme } from "../composables/useChartTheme";
import { PriorityResponse } from "../types";
import { mapPriorityColors } from "../utils/priorityDataByColor";

import VContainer from "@/shared/ui/common/VContainer.vue";
import VSkeleton from "@/shared/ui/common/VSkeleton.vue";
import VTitle from "@/shared/ui/common/VTitle.vue";

const {
  data = [],
  loader = false,
  theme = "light",
} = defineProps<{
  data: PriorityResponse[] | null;
  loader: boolean;
  theme: "light" | "dark";
}>();

const { chartTheme } = useChartTheme(() => theme);
const priorityOption = computed<EChartsOption>(() => {
  const { muted, font, secondaryBgLight } = chartTheme.value;

  return {
    animationDuration: 500,
    backgroundColor: "transparent",
    color: mapPriorityColors(data || [], chartTheme.value),
    tooltip: {
      trigger: "item",
      backgroundColor: secondaryBgLight,
      borderWidth: 0,
    },
    legend: {
      orient: "horizontal",
      bottom: "0",
      textStyle: {
        color: muted,
        fontFamily: font,
      },
    },
    dataset: {
      source: data || [],
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 15,
        },
        label: {
          show: true,
          position: "inside",
          formatter: "{d}%",
          color: secondaryBgLight,
          fontSize: 12,
          fontFamily: font,
          rotate: "tangential",
          align: "center",
          verticalAlign: "middle",
        },
        encode: {
          itemName: "priority",
          value: "count",
        },
      },
    ],
  };
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <VTitle title="Tasks by priority" />
    <VContainer class="shadow-customShadow h-full">
      <VSkeleton
        v-if="!data && loader"
        width="300"
        height="300"
        variant="circle"
      />

      <VChart
        v-if="data"
        :option="priorityOption"
        :autoresize="true"
        :loading="loader"
        class="h-[26.4rem]"
      />
    </VContainer>
  </div>
</template>
