<script setup lang="ts">
import TaskPriority from "./TaskPriority.vue";
import TaskTags from "./TaskTags.vue";
import type { Task } from "../../types";

const { item } = defineProps<{ item: Task; }>();
</script>

<template>
  <div class="flex flex-col gap-2 border-t border-border-default py-1">
    <slot>
      <div class="flex justify-between w-full">
        <h3 class="text-body-l text-txt-primary truncate w-[80%]">
          {{ item?.title }}
        </h3>
        <span
          v-if="item.deadlineWord"
          class="text-ui-caption text-secondary"
        >
          {{ item.deadlineWord }}
        </span>
        <span
          v-if="!item.deadlineWord"
          class="text-ui-caption text-secondary"
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
      <h4 class="text-ui-caption text-txt-primary">
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
      class="text-ui-caption text-muted"
    >
      {{ $t("dashboard.taskItem.no_tags") }}
    </span>
  </div>
</template>
