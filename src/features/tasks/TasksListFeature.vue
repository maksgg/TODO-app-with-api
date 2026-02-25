<script setup lang="ts">
import { computed, onMounted , ref, watch } from "vue";
import { toast } from "vue-sonner";

import useTasksRequests from "./api/useTasksRequests";
import TasksModalFormFields from "./components/TasksModalFormFields.vue";
import DeleteTaskModal from "./components/ui/DeleteTaskModal.vue";
import TasksTable from "./components/ui/TasksTable.vue";
import { useTasksModals } from "./composables/useTasksModals";
import { useTasksStore } from "./store/useTasksStore";
import { Task, TasksModals } from "./types";
import { groupTasksByStatus } from "./utils/groupTasksByStatus";

import { useAuthStore } from "@/shared/stores/useAuthStore";
import { FilterConfig } from "@/shared/types";
import VButton from "@/shared/ui/common/VButton.vue";
import VContainer from "@/shared/ui/common/VContainer.vue";
import VDropDown from "@/shared/ui/common/VDropDown.vue";
import VEmptyState from "@/shared/ui/common/VEmptyState.vue";
import VExpandableSection from "@/shared/ui/common/VExpandableSection.vue";
import VModal from "@/shared/ui/common/VModal.vue";
import VToolbar from "@/shared/ui/common/VToolbar.vue";

const toolBarPayload = ref({
  priority: { name: "All priorities", value: "all" },
  sort: { name: "Recently created", value: "createdAt:desc" },
  order: "",
});

const authStore = useAuthStore();
const tasksStore = useTasksStore();
const {
  modalLoader,
  modalFields,
  isModalType,
  isChanged,
  openModal,
  modalRequest,
  closeModal,
} = useTasksModals(() => requestParams.value);

const { fetchCompleteTask } = useTasksRequests();

const { execute: completeTask } = fetchCompleteTask(() => tasksStore.targetTask.id, {
  onSuccess: () => {
    toast.success("Status updated");
    tasksStore.getAllTasks();
  },
  onFinish: () => tasksStore.targetTask = null,
},
);

const emptyPageState = computed(
  () => !tasksStore.loading && tasksStore.allTasks && !tasksStore.allTasks?.data?.length,
);
const requestParams = computed(() => {
  const rawSort = toolBarPayload.value.sort?.value || "createdAt:desc";
  const priority = toolBarPayload.value.priority.value;
  const [field, direction] = rawSort.split(":");

  return {
    limit: tasksStore.allTasks?.pagination?.limit,
    sort: field,
    order: direction,
    priority: priority !== "all" ? priority : undefined,
  };
});
const activeModalType = computed(() => {
  if (isModalType.value === "edit") {
    return {
      title: "Edit task",
      btnText: "Save changes",
    };
  }

  return {
    title: "Add new task",
    btnText: "Add task",
  };
});
const groupTasks = computed(() => {
  const grouped = groupTasksByStatus(tasksStore.allTasks?.data);

  return [
    {
      title: "Pending",
      header: pendingTasksHeader,
      tasks: grouped.pending,
    },
    {
      title: "Completed",
      header: completedTasksHeader,
      tasks: grouped.completed,
    },
  ];
});

const toggleTaskStatus = async (id: string, status: boolean) => {
  tasksStore.targetTaskLoader = id;
  tasksStore.targetTask = { id };
  await completeTask({ data: { completed: status } });
};
const loadData = () => tasksStore.getAllTasks({ params: requestParams.value });

const toolbarConfig: FilterConfig= [
  {
    key: "priority",
    label: "Priority",
    options: [
      { name: "All priorities", value: "all" },
      { name: "High priority", value: "high" },
      { name: "Medium priority", value: "medium" },
      { name: "Low priority", value: "low" },
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
const pendingTasksHeader = [
  { key: "title", label: "Title", width: "42%" },
  { key: "priority", label: "Priority" },
  { key: "deadline", label: "Deadline" },
  { key: "tags", label: "Tags", width: "25%" },
  { key: "actions", label: "Actions", textAlign: "text-end", width: "3%" },
];
const completedTasksHeader = [
  { key: "title", label: "Title", width: "48%" },
  { key: "priority", label: "Priority" },
  { key: "tags", label: "Tags", width: "30%" },
];
const listsActions = [
  { value: "edit", label: "Edit task", disabled: !authStore.isAllowed("update:task") },
  { value: "delete", label: "Delete task", disabled: !authStore.isAllowed("delete:task"), dangerous: true },
];

watch(
  () => toolBarPayload.value,
  () => loadData(),
  { deep: true },
);

onMounted(() => loadData());
</script>

<template>
  <div class="flex flex-col gap-6 h-screen overflow-auto">
    <VToolbar
      v-model:filters="toolBarPayload"
      :filter-configs="toolbarConfig"
      :is-searchable="false"
      :disabled="tasksStore.loading || !authStore.isAllowed('read:task')"
      select-width="md"
      class="col-span-1"
    />
    <VEmptyState
      v-if="emptyPageState"
      title="No tasks yet"
      sub-title="Create your first task to start organizing your work"
    />
    <template v-if="authStore.isAllowed('read:task')">
      <VContainer
        v-for="group in groupTasks"
        :key="group.title"
        class="shadow-customShadow"
      >
        <VExpandableSection
          :title="`${group.title} (${group?.tasks?.length})`"
          :loader="tasksStore.loading && !tasksStore.targetTaskLoader"
        >
          <TasksTable
            :header="group?.header"
            :tasks="group?.tasks"
            :loader-id="tasksStore.targetTaskLoader"
            :loader="tasksStore.loading"
            @toggle="toggleTaskStatus"
          >
            <template
              v-if="group.title === 'Pending'"
              #actions="{ row, index }"
            >
              <VDropDown
                :options="listsActions"
                trigger="icon"
                icon-type="horizontalDots"
                :placement="index >= group.tasks.length - 2 ? 'topRight' : 'bottomRight'"
                @action="(val: TasksModals) => openModal(val, row as Task)"
              />
            </template>
          </TasksTable>
        </VExpandableSection>
      </VContainer>
    </template>
  </div>
  <Teleport
    to="#header-action"
    defer
  >
    <VButton
      text="Add task"
      icon="plus"
      :disabled="!authStore.isAllowed('create:task')"
      @click="openModal('create')"
    />
  </Teleport>
  <VModal
    id="createAndEdit-task"
    :title="activeModalType.title"
  >
    <TasksModalFormFields
      v-model="modalFields"
      :target-task="tasksStore.targetTask"
    />
    <template #footer>
      <div class="flex gap-5 w-full justify-end">
        <VButton
          text="Cancel"
          class="!bg-transparent text-primary"
          @click="closeModal"
        />
        <VButton
          :text="activeModalType.btnText"
          :loader="modalLoader"
          :disabled="modalLoader || !isChanged"
          @click="modalRequest"
        />
      </div>
    </template>
  </VModal>
  <DeleteTaskModal
    :task="tasksStore.targetTask"
    :loader="modalLoader"
    @close="closeModal"
    @request="modalRequest"
  />
</template>
