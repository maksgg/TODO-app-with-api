<script setup lang="ts">
import { useTasksStore } from "../store/useTasksStore";

import VCheckbox from "@/shared/ui/common/VCheckbox.vue";
import VDropDown from "@/shared/ui/common/VDropDown.vue";
import VTable from "@/shared/ui/common/VTable.vue";
import VToolbar from "@/shared/ui/common/VToolbar.vue";

const tasksStore = useTasksStore();

const tasksHeader = [
  { key: "title", label: "Title", width: "42%" },
  { key: "priority", label: "Priority" },
  { key: "deadline", label: "Deadline" },
  { key: "tags", label: "Tags", width: "25%" },
  { key: "actions", label: "Actions", textAlign: "text-end", width: "5%" },
];

const toolbarConfig = [
  {
    key: "priority",
    label: "Priority",
    options: [
      { name: "All priorities", value: "all:priority" },
      { name: "High priority", value: "high:priority" },
      { name: "Medium priority", value: "medium:priority" },
      { name: "Low priority", value: "low:priority" },
    ],
  },
  {
    key: "sort",
    label: "Sort by",
    options: [
      { name: "Recently created", value: "createdAt:desc" },
      { name: "Recently updated", value: "updatedAt:desc" },
      { name: "A -> Z", value: "title:asc" },
      { name: "Z -> A", value: "title:desc" },
    ],
  },
];

const onStatusChange = (id: string, status: boolean) => tasksStore.toggleTaskStatus(id , status);
</script>

<template>
  <div class="py-3">
    <VToolbar
      v-model:filters="tasksStore.toolBarPayload"
      :filter-configs="toolbarConfig"
      :is-searchable="false"
      class="col-span-1"
    />
    <span class="text-bodyL">Pending ({{ tasksStore.pendingTasks?.length }})</span>
  </div>
  <VTable
    :header="tasksHeader"
    :rows="tasksStore.pendingTasks"
    :pagination="tasksStore.pagination"
    :is-header-visible="false"
  >
    <template #col-title="{ row }">
      <div class="flex gap-2">
        <VCheckbox
          :id="row.id"
          :model-value="row.status === 'done'"
          @update:model-value="onStatusChange(row.id, row.status !== 'done')"
        />
        <span class="truncate">{{ row.title }}</span>
      </div>
    </template>
    <template #col-tags="{ row }">
      <div class="flex gap-2">
        <span
          v-for="(tag, index) in row.tags"
          :key="index"
        >
          {{ tag }}
        </span>
      </div>
    </template>
    <template #col-actions="{ row }">
      <VDropDown
        :id="row.id"
        :items="tasksStore.listsActions"
        trigger="icon"
        placement="bottomRight"
        @action="tasksStore.actions"
      />
    </template>
  </VTable>
</template>
