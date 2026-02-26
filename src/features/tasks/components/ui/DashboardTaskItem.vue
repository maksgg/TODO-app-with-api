<script setup lang="ts">
import TaskPriority from "./TaskPriority.vue";
import TaskTags from "./TaskTags.vue";
import { Task } from "../../types";

const { item } = defineProps<{ item: Task; }>();
</script>

<template>
  <div class="flex flex-col gap-2 border-t border-borderDefault py-1">
    <slot>
      <div class="flex justify-between">
        <h3 class="text-bodyL text-txtPrimary">
          {{ item?.title }}
        </h3>
        <span
          v-if="item.deadlineWord"
          class="text-uiCaption text-secondary"
        >
          {{ item.deadlineWord }}
        </span>
        <span
          v-if="!item.deadlineWord"
          class="text-uiCaption text-secondary"
        >
          {{
            item?.status === "done" ?
              $t("dashboard.taskItem.completed") :
              $t("dashboard.taskItem.pending")
          }}
        </span>
      </div>
    </slot>
    <div class="flex items-center gap-4">
      <h4 class="text-uiCaption text-txtPrimary">
        {{ item?.listId?.title }}
      </h4>
      <TaskPriority :priority="item.priority" />
    </div>
    <TaskTags
      v-if="item.tags.length > 0"
      :tags="item.tags"
    />
    <span
      v-else
      class="text-uiCaption text-muted"
    >
      {{ $t("dashboard.taskItem.no_tags") }}
    </span>
  </div>
</template>
