import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";

import { useListsStore } from "@/features/lists/store/useListsStore";
import useTasksRequests from "@/features/tasks/api/useTasksRequests";
import { useModal } from "@/shared/composables/useModal";

export function useWeeklyGoals() {
  const weeklySelectedTaskIds = ref<string[]>([]);
  const initialWeeklyIds = ref<string[]>([]);
  const modalMode = ref<"add" | "edit">("add");
  const localLoaderId = ref<string | null>(null);

  const listsStore = useListsStore();
  const { t } = useI18n();
  const { fetchWeeklyGoalTasks, fetchToggleWeeklyGoalTasks } = useTasksRequests();
  const modals = {
    add: useModal("addAndEditWeeklyGoals"),
    edit: useModal("addAndEditWeeklyGoals"),
  };

  const listsWithTasks = computed(() => listsStore.allLists?.data.filter((el) => el.tasks.length));
  const changedIds = computed(() => {
    const added = weeklySelectedTaskIds.value.filter(
      (id) => !initialWeeklyIds.value.includes(id));
    const removed = initialWeeklyIds.value.filter(
      (id) => !weeklySelectedTaskIds.value.includes(id));

    return [...added, ...removed];
  });

  const {
    data: weeklyTasks,
    execute: getWeeklyTasks,
    loading: weeklyTasksLoader,
  } = fetchWeeklyGoalTasks();

  const {
    execute: toggleWeeklyTask,
    loading: weeklyToggleLoader,
  } =  fetchToggleWeeklyGoalTasks(changedIds, {
    onSuccess: async () => {
      await getWeeklyTasks();
    },
    onFinish: () => {
      weeklySelectedTaskIds.value = [];
      initialWeeklyIds.value = [];
      localLoaderId.value = null;
    },
  });

  const openModal = (type: "add" | "edit") => {
    modalMode.value = type;
    const currentIds: string[] = [];

    listsStore.allLists.data.forEach((list) => {
      list.tasks.forEach((task) => {
        if (task.isWeeklyGoal) currentIds.push(task.id);
      });
    });

    weeklySelectedTaskIds.value = [...currentIds];
    initialWeeklyIds.value = [...currentIds];

    modals[type].open();
  };

  const closeModal = () => modals[modalMode.value].close();

  const toggleModalWeeklyTask = (taskId: string) => {
    const index = weeklySelectedTaskIds.value.indexOf(taskId);
    const maxWeeklyGoals = 3;

    if (index !== -1) {
      weeklySelectedTaskIds.value.splice(index, 1);
    } else {
      if (weeklySelectedTaskIds.value.length >= maxWeeklyGoals) {
        toast.warning(t("dasboard.toasts.you_can_select_up_to_3_weekly_goals"));
        return;
      }
      weeklySelectedTaskIds.value.push(taskId);
    }
  };

  const submitGoals = async () => {
    await toggleWeeklyTask();
    toast.success(t("dasboard.toasts.updated_successfully"));
    closeModal();
  };

  const removeWeeklyTask = async (taskId: string) => {
    localLoaderId.value = taskId;
    weeklySelectedTaskIds.value = [taskId];
    await toggleWeeklyTask();
  };

  return {
    listsWithTasks,
    localLoaderId,
    weeklyTasks,
    weeklySelectedTaskIds,
    weeklyTasksLoader,
    weeklyToggleLoader,
    modalMode,
    getWeeklyTasks,
    openModal,
    closeModal,
    toggleWeeklyTask,
    toggleModalWeeklyTask,
    removeWeeklyTask,
    submitGoals,
  };
}
