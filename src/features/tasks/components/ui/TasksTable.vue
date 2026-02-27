<script setup lang="ts">
import TaskPriority from "./TaskPriority.vue";
import TaskTags from "./TaskTags.vue";
import type { Task } from "../../types";
import TaskTableSkeleton from "../skeletons/TaskTableSkeleton.vue";

import VCheckbox from "@/shared/ui/common/VCheckbox.vue";
import VTable from "@/shared/ui/table/VTable.vue";

type TableHeader = {
  key: string;
  label: string;
  textAlign?: string;
  width?: string;
};

const { tasks, header, loaderId, loader } = defineProps<{
  tasks: Task[];
  header: TableHeader[];
  loaderId?: string | null;
  loader?: boolean;
}>();

const emit = defineEmits<{
  "toggle": [id: string, status: boolean],
  "action": [type: string, task: Task]
}>();
</script>

<template>
  <TaskTableSkeleton v-if="loader && !loaderId" />
  <VTable
    v-else
    :header="header"
    :rows="tasks"
    :local-loader="loaderId"
    :is-header-visible="false"
  >
    <template #toolBar>
      <slot name="toolBar" />
    </template>

    <template #col-title="{ row }">
      <VCheckbox
        :id="row.id"
        :text="row.title"
        :model-value="row.status === 'done'"
        @update:model-value="(val) => emit('toggle', row.id, val)"
      />
    </template>

    <template #col-priority="{ row }">
      <TaskPriority :priority="row.priority" />
    </template>

    <template #col-deadline="{ row }">
      <span
        :class="[
          'text-bodyM', row.deadline === 'Overdue' ? 'text-dangerous' : 'text-txtPrimary']"
      >
        {{ row.deadline }}
      </span>
    </template>

    <template #col-tags="{ row }">
      <TaskTags
        :tags="row.tags"
        variant="table"
        with-dividers
      />
    </template>

    <template #col-actions="{ row, index }">
      <slot
        name="actions"
        :row="row"
        :index="index"
      />
    </template>
  </VTable>
</template>
