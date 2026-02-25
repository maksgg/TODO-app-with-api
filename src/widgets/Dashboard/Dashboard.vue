<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

import WeeklyGoalsModals from "./components/WeeklyGoalsModals.vue";
import { useWeeklyGoals } from "./composables/useWeeklyGoals";
import { filterDeadlineTasks } from "./utils/filterDateByDeadlines";

import { useListsStore } from "@/features/lists/store/useListsStore";
import useTasksRequests from "@/features/tasks/api/useTasksRequests";
import DashboardTasksGroup from "@/features/tasks/components/DashboardTasksGroup.vue";
import EmptyDashboardTasks from "@/features/tasks/components/ui/EmptyDashboardTasks.vue";
import VContainer from "@/shared/ui/common/VContainer.vue";

const taskPayloadParams = ref({
  limit: 20,
  startDate: "2026-01-01",
  endDate: "2026-03-15",
});

const listsStore = useListsStore();
const {
  listsWithTasks,
  weeklyTasks,
  weeklySelectedTaskIds,
  weeklyTasksLoader,
  weeklyToggleLoader,
  localLoaderId,
  modalMode,
  getWeeklyTasks,
  openModal,
  closeModal,
  removeWeeklyTask,
  toggleModalWeeklyTask,
  submitGoals,
} = useWeeklyGoals();

const { fetchTaskWithDeadlines } = useTasksRequests();

const {
  data: deadlinesTasks,
  execute: getDeadlinesTasks,
  loading: deadlinesLoader,
} = fetchTaskWithDeadlines({
  params: taskPayloadParams.value,
});

const loadData = async () => {
  await Promise.all([
    getDeadlinesTasks(),
    getWeeklyTasks(),
    listsStore.getAllLists({ params: { isOwn: true } }),
  ]);
};

const mainLoader = computed(
  () => deadlinesLoader.value || listsStore.allListsLoader || weeklyTasksLoader.value);
const groupDeadlineTasks = computed(() => filterDeadlineTasks(deadlinesTasks.value?.data));

const tasksGroup = computed(() => {
  return [
    {
      variant: "deadline" as "deadline",
      title: "Today's Tasks",
      subtitle: `You’ve ${deadlinesTasks.value?.total} tasks for today`,
      btnTitle: "View all",
      fetchedData: groupDeadlineTasks.value.today,
      emptySubtitle: "No tasks for today yet",
      emptyText: "Create your first task to get started",
      addBtnText: "Add task",
    },
    {
      variant: "deadline" as "deadline",
      title: "Upcoming Deadlines",
      subtitle: "Tasks that need your attention soon",
      btnTitle: "View all",
      fetchedData: groupDeadlineTasks.value.upcoming,
      emptySubtitle: "No upcoming deadlines",
      emptyText: "Tasks with due dates will appear here",
      addBtnText: "Add task",
    },
    {
      variant: "weekly" as "weekly",
      title: "Weekly Focus Goals",
      subtitle: "Your top priorities for this week",
      btnTitle: "Edit",
      fetchedData: weeklyTasks.value?.data,
      emptySubtitle: "No weekly goals yet",
      emptyText: "Add your top priorities to stay focused",
      addBtnText: "Add weekly goal",
    },
  ];
});

onMounted(() => loadData());
</script>

<template>
  <div
    class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 w-full pb-2
    rounded-lg overflow-auto no-scrollbar min-h-[5rem]"
  >
    <VContainer
      v-for="(tasks, index) in tasksGroup"
      :key="tasks.title"
      :class="['shadow-customShadow', index === 2 ? 'lg:col-span-2' : 'col-span-1']"
    >
      <EmptyDashboardTasks
        v-if="!mainLoader && tasks.fetchedData?.length === 0"
        :item="tasks"
        @add-weekly-goals="openModal"
      />
      <DashboardTasksGroup
        v-else
        :item="tasks"
        :loader="mainLoader"
        :local-loader="localLoaderId"
        @edit-weekly-goals="openModal"
        @remove-weekly-goal="removeWeeklyTask"
      />
    </VContainer>
  </div>
  <WeeklyGoalsModals
    :lists="listsWithTasks"
    :selected-ids="weeklySelectedTaskIds"
    :mode="modalMode"
    :loading="weeklyToggleLoader"
    @toggle="toggleModalWeeklyTask"
    @submit="submitGoals"
    @close="closeModal"
  />
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none; /* Для Chrome, Safari та Opera */
}

.no-scrollbar {
  -ms-overflow-style: none;  /* Для Internet Explorer та Edge */
  scrollbar-width: none;  /* Для Firefox */
}
</style>
