<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import type { AnalyticsResponse } from "../types";

import VContainer from "@/shared/ui/common/VContainer.vue";
import VSkeleton from "@/shared/ui/common/VSkeleton.vue";
import VTitle from "@/shared/ui/common/VTitle.vue";

type TaskInfo = {
  data: AnalyticsResponse | null;
  loader?: boolean;
};
const { data = null, loader = false } = defineProps<TaskInfo>();

const { t } = useI18n();
const tasksInfo = computed(() => {
  return [
    {
      key: "completed",
      taskStatus:  t("analytics.completed"),
      tasksCount: data?.tasks.completed,
      tasksCountColor: "text-success",
    },
    {
      key: "active",
      taskStatus: t("analytics.active"),
      tasksCount: data?.tasks.todo,
      tasksCountColor: "text-muted",
    },
    {
      key: "overdue",
      taskStatus: t("analytics.overdue"),
      tasksCount: data?.tasks.archived,
      tasksCountColor: "text-dangerous",
    },
  ];
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <VTitle :title="$t('analytics.title.status_overview')" />
    <div class="flex gap-4">
      <VContainer
        v-for="taskInfo in tasksInfo"
        :key="taskInfo.key"
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
