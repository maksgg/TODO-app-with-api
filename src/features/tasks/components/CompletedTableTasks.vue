<script setup lang="ts">
import { ref } from "vue";

import { useTasksStore } from "../store/useTasksStore";

import VButton from "@/shared/ui/common/VButton.vue";
import VCheckbox from "@/shared/ui/common/VCheckbox.vue";
import VTable from "@/shared/ui/common/VTable.vue";

const tasksStore = useTasksStore();
const isExpanded = ref(true);


const tasksHeader = [
  { key: "title", label: "Title", width: "48%" },
  { key: "priority", label: "Priority" },
  { key: "tags", label: "Tags", width: "30%" },
];

const onStatusChange = (id: string, status: boolean) => tasksStore.toggleTaskStatus(id , status);
const isTableExpanded = () => isExpanded.value = !isExpanded.value;
</script>

<template>
  <div class="basis-1/5 shrink px-4 items-start">
    <div class="flex gap-2 py-3 col-span-1">
      <span class="text-bodyL">Completed ({{ tasksStore.completedTasks?.length }})</span>
      <VButton
        icon="chevronUp"
        variant="ghost"
        :class="['transition-transform duration-300', isExpanded ? '' : 'rotate-180']"
        @click="isTableExpanded"
      />
    </div>
    <div
      class="grid transition-[grid-template-rows] duration-500 ease-in-out max-h-[20rem]"
      :class="isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
    >
      <VTable
        :header="tasksHeader"
        :rows="tasksStore.completedTasks"
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
      </VTable>
    </div>
  </div>
</template>
