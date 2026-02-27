<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";

import useTasksRequests from "./api/useTasksRequests";
import TasksModalFormFields from "./components/TasksModalFormFields.vue";
import DeleteTaskModal from "./components/ui/DeleteTaskModal.vue";
import TasksTable from "./components/ui/TasksTable.vue";
import { useTasksModals } from "./composables/useTasksModals";
import { useTasksStore } from "./store/useTasksStore";
import type { Task, TasksModals } from "./types";
import { groupTasksByStatus } from "./utils/groupTasksByStatus";

import { useAuthStore } from "@/shared/stores/useAuthStore";
import VButton from "@/shared/ui/common/VButton.vue";
import VContainer from "@/shared/ui/common/VContainer.vue";
import VDropDown from "@/shared/ui/common/VDropDown.vue";
import VEmptyState from "@/shared/ui/common/VEmptyState.vue";
import VExpandableSection from "@/shared/ui/common/VExpandableSection.vue";
import VModal from "@/shared/ui/common/VModal.vue";
import VToolbar from "@/shared/ui/common/VToolbar.vue";

const { t } = useI18n();
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
    toast.success(t("tasks.toasts.status_updated"));
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
      title: t("tasks.modal.edit_task"),
      btnText: t("tasks.modalBtn.save_changes"),
    };
  }

  return {
    title: t("tasks.modal.add_new_task"),
    btnText: t("tasks.modalBtn.add_task"),
  };
});
const groupTasks = computed(() => {
  const grouped = groupTasksByStatus(tasksStore.allTasks?.data);

  return [
    {
      key: "pending",
      title: t("tasks.tableHead.pending"),
      header: pendingTasksHeader,
      tasks: grouped.pending,
    },
    {
      key: "completed",
      title: t("tasks.tableHead.completed"),
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

const toolbarConfig = computed(() => [
  {
    key: "priority",
    label: t("tasks.toolbar.priority"),
    options: [
      { name: t("tasks.toolbar.all_priorities"), value: "all" },
      { name: t("tasks.toolbar.high_priority"), value: "high" },
      { name: t("tasks.toolbar.medium_priority"), value: "medium" },
      { name: t("tasks.toolbar.low_priority"), value: "low" },
    ],
  },
  {
    key: "sort",
    label: t("tasks.toolbar.sort_by"),
    options: [
      { name: t("tasks.toolbar.recently_created"), value: "createdAt:desc" },
      { name: t("tasks.toolbar.recently_updated"), value: "updatedAt:desc" },
      { name: t("tasks.toolbar.A_->_Z"), value: "title:asc" },
      { name: t("tasks.toolbar.Z_->_A"), value: "title:desc" },
    ],
  },
]);

const toolBarPayload = computed({
  get: () => ({
    priority: toolbarConfig.value[0].options[0],
    sort: toolbarConfig.value[1].options[0],
  }),
  set: (option) => option,
});
const pendingTasksHeader = computed(() => [
  { key: "title", label: t("tasks.pendingTableHead.title"), width: "42%" },
  { key: "priority", label: t("tasks.pendingTableHead.priority") },
  { key: "deadline", label: t("tasks.pendingTableHead.deadline") },
  { key: "tags", label: t("tasks.pendingTableHead.tags"), width: "25%" },
  { key: "actions", label: t("tasks.pendingTableHead.actions"), textAlign: "text-end", width: "3%" },
]);
const completedTasksHeader = computed(() => [
  { key: "title", label: t("tasks.completedTableHead.title"), width: "48%" },
  { key: "priority", label: t("tasks.completedTableHead.priority") },
  { key: "tags", label: t("tasks.completedTableHead.tags"), width: "30%" },
]);
const listsActions = computed(() => [
  { value: "edit", label: t("tasks.actions.edit_task"), disabled: !authStore.isAllowed("update:task") },
  { value: "delete", label: t("tasks.actions.delete_task"), disabled: !authStore.isAllowed("delete:task"), dangerous: true },
]);

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
      :placeholder="$t('tasks.toolbar.search')"
      select-width="md"
      class="col-span-1"
    />
    <VEmptyState
      v-if="emptyPageState"
      :title="$t('tasks.emptyState.no_tasks_yet')"
      :sub-title="$t('tasks.emptyState.create_your_first_task_to_start_organizing_your_work')"
    />
    <template v-if="authStore.isAllowed('read:task')">
      <VContainer
        v-for="group in groupTasks"
        :key="group.key"
        class="shadow-customShadow"
      >
        <VExpandableSection
          :title="`${group.title} (${group?.tasks?.length})`"
          :loader="tasksStore.loading && !tasksStore.targetTaskLoader"
        >
          <TasksTable
            :header="group?.header.value"
            :tasks="group?.tasks"
            :loader-id="tasksStore.targetTaskLoader"
            :loader="tasksStore.loading"
            @toggle="toggleTaskStatus"
          >
            <template
              v-if="group.key === 'pending'"
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
      :text="$t('tasks.btn.add_task')"
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
          :text="$t('tasks.modalBtn.cancel')"
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
