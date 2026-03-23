import { defineStore } from "pinia";
import { ref, shallowRef } from "vue";
import { useRoute } from "vue-router";

import useTasksRequests from "../api/useTasksRequests";
import type { Task } from "../types";
import { dateFormatterIntoOneWord } from "../utils/dateFormatterIntoOneWord";

export const useTasksStore = defineStore("tasks", () => {
  const targetTaskLoader = ref<string | null>(null);
  const targetTask = shallowRef<Partial<Task> | null>(null);

  const route = useRoute();

  const { fetchAllTasks } = useTasksRequests();

  const { data: allTasks, execute: getAllTasks, loading } = fetchAllTasks(() => route.params.id, {
    onSuccess: ({ data }) => {
      data.data.forEach((el) => el.deadline = dateFormatterIntoOneWord(el.dueDate));
      targetTaskLoader.value = null;
    },
  });

  return {
    allTasks,
    loading,
    targetTask,
    targetTaskLoader,
    getAllTasks,
  };
});
