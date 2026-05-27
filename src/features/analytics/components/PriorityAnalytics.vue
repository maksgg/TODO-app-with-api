<script setup lang="ts">
import { EChartsOption } from "echarts";
import { computed } from "vue";
import VChart from "vue-echarts";
import { useI18n } from "vue-i18n";

import { useChartTheme } from "../composables/useChartTheme";
import type { PriorityResponse } from "../types";
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

const { t } = useI18n();
const { chartTheme } = useChartTheme(() => theme);
const priorityOption = computed<EChartsOption>(() => {
  const { muted, font, secondaryBgLight, bg } = chartTheme.value;

  const localizedData = (data || []).map(item => ({
    ...item,
    priorityLabel: t(`tasks.modalPriority.${item.priority.toLowerCase()}`),
  }));
  return {
    animation: false,
    backgroundColor: "transparent",
    color: mapPriorityColors(data || [], chartTheme.value),
    tooltip: {
      trigger: "item",
      backgroundColor: bg,
      borderWidth: 0,
    },
    legend: {
      orient: "horizontal",
      top: "0",
      textStyle: {
        color: muted,
        fontFamily: font,
      },
    },
    dataset: {
      source: localizedData,
    },
    series: [
      {
        type: "pie",
        radius: ["60%", "80%"],
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
          itemName: "priorityLabel",
          value: "count",
        },
      },
    ],
  };
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <VTitle :title="$t('analytics.title.tasks_by_priority')" />
    <VContainer class="shadow-custom-shadow h-full">
      <div class="flex flex-col justify-center items-center gap-8 flex-1">
        <VSkeleton
          v-if="!data && loader"
          width="300"
          height="300"
          variant="circle"
        />
        <div
          v-if="!data && loader"
          class="flex gap-3"
        >
          <VSkeleton
            v-for="priority in 3"
            :key="`${priority}-priority`"
            width="80"
            height="20"
          />
        </div>
      </div>
      <VChart
        v-if="data"
        :option="priorityOption"
        :autoresize="true"
        :loading="loader"
        class="h-[26.4rem]!"
      />
    </VContainer>
  </div>
</template>
