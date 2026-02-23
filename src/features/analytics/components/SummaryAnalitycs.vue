<script setup lang="ts">
import { computed } from "vue";

import { AnalyticsResponse } from "../types";

import VContainer from "@/shared/ui/common/VContainer.vue";
import VSkeleton from "@/shared/ui/common/VSkeleton.vue";
import VTitle from "@/shared/ui/common/VTitle.vue";

type TaskInfo = {
  data: AnalyticsResponse | null;
  loader?: boolean;
};
const { data = null, loader = false } = defineProps<TaskInfo>();

const tasksInfo = computed(() => {
  return [
    {
      taskStatus: "Completed",
      tasksCount: data?.tasks.completed,
      tasksCountColor: "text-success",
    },
    {
      taskStatus: "Active",
      tasksCount: data?.tasks.todo,
      tasksCountColor: "text-muted",
    },
    {
      taskStatus: "Overdue",
      tasksCount: data?.tasks.archived,
      tasksCountColor: "text-dangerous",
    },
  ];
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <VTitle title="Status Overview" />
    <div class="flex gap-4">
      <VContainer
        v-for="taskInfo in tasksInfo"
        :key="taskInfo.taskStatus"
        class="w-[20%] shadow-customShadow"
      >
        <template #header>
          <VSkeleton
            v-if="loader"
            width="100"
            height="15"
          />
          <h3
            v-else
            class="text-uiLabel text-secondary"
          >
            {{ taskInfo.taskStatus }}
          </h3>
        </template>
        <VSkeleton
          v-if="loader"
          width="100"
          height="30"
        />
        <span
          v-else
          :class="['text-dataMetric text-muted', taskInfo.tasksCountColor]"
        >
          {{ taskInfo.tasksCount }}
        </span>
      </VContainer>
    </div>
  </div>
</template>
