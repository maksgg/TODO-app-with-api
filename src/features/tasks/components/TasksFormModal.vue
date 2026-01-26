<script setup lang="ts">
import {  computed } from "vue";

import { useTasksStore } from "../store/useTasksStore";

import VInput from "@/shared/ui/common/VInput.vue";
import VList from "@/shared/ui/common/VList.vue";
import VModal from "@/shared/ui/common/VModal.vue";
import VMultiselect from "@/shared/ui/common/VMultiselect.vue";

const tasksStore = useTasksStore();

// const { name } = defineProps<{ name: string; }>();

const prioritySelect = {
  label: "Priority",
  options: [
    { name: "High", value: "high" },
    { name: "Medium", value: "medium" },
    { name: "Low", value: "low" },
  ],
};

// const dueSelect ={
//   label: "Due",
//   options: [
//     { name: "No due date", value: "updatedAt:desc" },
//     { name: "Today", value: "createdAt:desc" },
//     { name: "Tomorrow", value: "createdAt:desc" },
//     { name: "This week", value: "title:asc" },
//     { name: "Next week", value: "title:desc" },
//   ],
// };

const isOpen = computed({
  get: () => !!tasksStore.isModalType,
  set: (val) => !val && tasksStore.closeModal(),
});

const modalContent = computed(() => {
  if (tasksStore.isModalType === "edit") {
    return {
      containerTag: "form" as const,
      modalTitle: "Edit task",
      modalSize: "lg" as const,
      btnText: "Save changes",
      btnVariant: "primary" as const,
    };
  };
  if (tasksStore.isModalType === "delete") {
    return {
      containerTag: "div" as const,
      modalTitle: "Delete task",
      modalSize: "md" as const,
      btnText: "Delete task",
      btnVariant: "dangerous" as const,
    };
  };

  return {
    containerTag: "form" as const,
    modalTitle: "Add new task",
    modalSize: "lg" as const,
    btnText: "Add task",
    btnVariant: "primary" as const,
  };
});
</script>

<template>
  <VModal
    v-model="isOpen"
    :as="modalContent.containerTag"
    :title="modalContent.modalTitle"
    :btn-title="modalContent.btnText"
    :btn-variant="modalContent.btnVariant"
    :size="modalContent.modalSize"
    :loader="tasksStore.mainLoader"
    @submit="tasksStore.request"
  >
    <template
      v-if="tasksStore.isModalType !== 'delete'"
      #main
    >
      <div class="flex flex-col gap-4 text-left">
        <VInput
          v-model="tasksStore.modalFields.taskName"
          label="Task name"
          placeholder="Enter task name"
        />
        <div>
          <VMultiselect
            v-model:model="tasksStore.priorityModalSelect"
            :title="prioritySelect.label"
            :options="prioritySelect.options"
            track-by="name"
          />
          <!-- <VMultiselect /> date picker need to be -->
        </div>
        <VInput
          v-model="tasksStore.modalFields.taskTags"
          label="Tags"
          placeholder="Add up to 3 tags"
        />
        <VList
          v-if="tasksStore.targetTask?.tags?.length > 0"
          :list-items="tasksStore.targetTask?.tags"
          class="flex gap-2"
        />
      </div>
    </template>
    <template
      v-else
      #main
    >
      <div>
        <h4 class="font-bold">
          Are you sure you want to delete <span>"{{ tasksStore.targetTask.title }}"</span> task?
        </h4>
        <p class="text-sm">
          This action can’t be undone
        </p>
      </div>
    </template>
  </VModal>
</template>
