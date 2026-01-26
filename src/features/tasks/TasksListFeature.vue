<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";

import CompletedTableTasks from "./components/CompletedTableTasks.vue";
import TasksFormModal from "./components/TasksFormModal.vue";
import TodoTableTasks from "./components/TodoTableTasks.vue";
import { useTasksStore } from "./store/useTasksStore";

import VButton from "@/shared/ui/common/VButton.vue";
import VHeader from "@/shared/ui/common/VHeader.vue";
import VLoader from "@/shared/ui/common/VLoader.vue";

const route = useRoute();

const { listName } = defineProps<{ listName: string; }>();

const tasksStore = useTasksStore();

watch(
  () => tasksStore.toolBarPayload,
  () => tasksStore.loadData(),
  { deep: true },
);

onMounted(() => {
  tasksStore.listId = route.params.id as string;
  tasksStore.loadData();
});
</script>

<template>
  <VHeader>
    <template #title>
      <div class="flex justify-center items-center gap-2">
        <VButton
          icon="chevronLeft"
          variant="ghost"
          :show-text="false"
          to="/list"
        />
        <span class="text-bodyL">{{ listName }}</span>
      </div>
    </template>
    <template #actions>
      <VButton
        text="Add task"
        icon="plus"
        @click="tasksStore.openModal('create', tasksStore.listId)"
      />
    </template>
  </VHeader>
  <div class="relative flex flex-col h-screen px-12 pb-6">
    <div
      v-if="tasksStore.mainLoader"
      :class="[`absolute inset-0 z-[100] flex items-center justify-center bg-background
      backdrop-blur-[2px] transition-all duration-300`
      ]"
    >
      <VLoader size="lg" />
    </div>
    <TodoTableTasks v-if="!tasksStore.emptyPageState" />
    <CompletedTableTasks v-if="tasksStore.completedTasks?.length > 0" />
    <!-- <VTable
      v-if="!tasksStore.emptyPageState"
      :header="tasksHeader"
      :rows="tasksStore.allTasks?.data"
      :pagination="tasksStore.pagination"
      :loader="tasksStore.loading"
      :is-header-visible="false"
    >
      <template #toolBar>
        <div>
          <VToolbar
            v-model:filters="tasksStore.toolBarPayload"
            :filter-configs="toolbarConfig"
            :is-searchable="false"
            class="col-span-1"
          />
          <span class="text-bodyL">Pending ({{ tasksStore.pendingTasks }})</span>
        </div>
      </template>
      <template #col-title="{ row }">
        <div class="flex gap-2">
          <VCheckbox />
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
    </VTable> -->
    <div
      v-else-if="tasksStore.emptyPageState"
      class="flex flex-col gap-2 pt-6 justify-center items-center w-full"
    >
      <h4 class="text-headingCard text-txtPrimary">
        No tasks yet
      </h4>
      <span class="text-bodyM text-secondary">
        Create your first task to start organizing your goals
      </span>
    </div>
  </div>
  <TasksFormModal />
</template>
