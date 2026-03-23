<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";

import WeeklyGoalsModals from "./components/WeeklyGoalsModals.vue";
import { useWeeklyGoals } from "./composables/useWeeklyGoals";
import { filterDeadlineTasks } from "./utils/filterDateByDeadlines";


import { useListsStore } from "@/features/lists/store/useListsStore";
import useTasksRequests from "@/features/tasks/api/useTasksRequests";
import DashboardTasksGroup from "@/features/tasks/components/DashboardTasksGroup.vue";
import EmptyDashboardTasks from "@/features/tasks/components/ui/EmptyDashboardTasks.vue";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import VContainer from "@/shared/ui/common/VContainer.vue";

const taskPayloadParams = ref({
  limit: 20,
  startDate: "2026-01-01",
  endDate: "2026-03-15",
});

const { t } = useI18n();

const listsStore = useListsStore();
const authStore = useAuthStore();
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
  const promises: any[] = [
    getDeadlinesTasks(),
    getWeeklyTasks(),
  ];
  if (authStore.isAllowed("read:list")) {
    promises.push(listsStore.getAllLists({ params: { isOwn: true } }));
  }

  await Promise.all(promises);
};

const mainLoader = computed(() => deadlinesLoader.value || listsStore.allListsLoader);
const groupDeadlineTasks = computed(() => filterDeadlineTasks(deadlinesTasks.value?.data));

const tasksGroup = computed(() => {
  return [
    {
      variant: "deadline" as "deadline",
      title: t("dashboard.title.today_tasks"),
      subtitle: `${t("dashboard.subTitle.you’ve")} ${deadlinesTasks.value?.total} ${t("dashboard.subTitle.tasks_for_today")}`,
      btnTitle: t("dashboard.btn.view_all"),
      fetchedData: groupDeadlineTasks.value.today,
      emptySubtitle: t("dashboard.emptyState.no_tasks_for_today_yet"),
      emptyText: t("dashboard.emptyState.create_your_first_task_to_get_started"),
      addBtnText: t("dashboard.emptyState.create_your_own_list"),
    },
    {
      variant: "deadline" as "deadline",
      title: t("dashboard.title.upcoming_deadlines"),
      subtitle: t("dashboard.subTitle.tasks_that_need_your_attention_soon"),
      btnTitle: t("dashboard.btn.view_all"),
      fetchedData: groupDeadlineTasks.value.upcoming,
      emptySubtitle: t("dashboard.emptyState.no_upcoming_deadlines"),
      emptyText: t("dashboard.emptyState.tasks_with_due_dates_will_appear_here"),
      addBtnText: t("dashboard.emptyState.create_your_own_list"),
    },
    {
      variant: "weekly" as "weekly",
      title: t("dashboard.title.weekly_focus_goals"),
      subtitle: t("dashboard.subTitle.your_top_priorities_for_this_week"),
      btnKey: "edit",
      btnTitle: t("dashboard.btn.edit"),
      fetchedData: weeklyTasks.value?.data,
      emptySubtitle: t("dashboard.emptyState.no_weekly_goals_yet"),
      emptyText: t("dashboard.emptyState.add_your_top_priorities_to_stay_focused"),
      addBtnText: t("dashboard.emptyState.add_weekly_goal"),
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
        :is-allowed="authStore.isAllowed('read:list')"
        :weekly-loader="weeklyTasksLoader"
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
