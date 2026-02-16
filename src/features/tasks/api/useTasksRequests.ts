import { useApiDelete, useApiGet, useApiPatch, useApiPost,  useApiBatch, type UseApiOptions } from "@ametie/vue-muza-use";
import { MaybeRefOrGetter, toValue } from "vue";

import type {
  TaskResponse,
  AllTasksResponse,
  CreateTaskRequest,
  CreateTaskResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
  Task,
  TasksDeadlinesResponse,
  TasksWithWeeklyGoalResponse,
  ToggleWeeklyGoalResponse,
} from "@/features/tasks/types/index";

export default () => {
  const fetchCreateTask = (
    listId: MaybeRefOrGetter<string | string[]>,
    options?: UseApiOptions<CreateTaskResponse, CreateTaskRequest>,
  ) => {
    return useApiPost(() => `/tasks/lists/${toValue(listId)}`, options);
  };

  const fetchAllTasks = (
    listId:  MaybeRefOrGetter<string | string[]>,
    options?: UseApiOptions<AllTasksResponse>,
  ) => {
    return useApiGet(() => `/tasks/lists/${toValue(listId)}`, options);
  };

  const fetchTargetTask = (
    taskId: string | string[],
    options?: UseApiOptions<TaskResponse>,
  ) => {
    return useApiGet(`/tasks/${taskId}`, options);
  };

  const fetchUpdateTask = (
    taskId: MaybeRefOrGetter<string>,
    options?: UseApiOptions<UpdateTaskResponse, UpdateTaskRequest>,
  ) => {
    return useApiPatch(() => `/tasks/${toValue(taskId)}`, options);
  };

  const fetchDeleteTargetTask = (
    taskId: MaybeRefOrGetter<string>,
    options?: UseApiOptions<TaskResponse>,
  ) => {
    return useApiDelete(() => `/tasks/${toValue(taskId)}`, options);
  };
  type CompleteRequest = {
    completed: boolean;
  };

  const fetchCompleteTask = (
    taskId: MaybeRefOrGetter<string>,
    options?: UseApiOptions<TaskResponse, CompleteRequest>,
  ) => {
    return useApiPatch(() => `/tasks/${toValue(taskId)}/complete`, options);
  };

  const fetchAllStarredTasks = (
    options?: UseApiOptions<TaskResponse, Pick<Task, "id">>, // check response and set type
  ) => {
    return useApiGet("/tasks/starred/all", options);
  };

  const fetchTaskWithDeadlines = (
    options?: UseApiOptions<TasksDeadlinesResponse>,
  ) => {
    return useApiGet("/tasks/deadlines", options);
  };

  const fetchToggleStarTask = (
    taskId: string | string[],
    options?: UseApiOptions<TaskResponse, Pick<Task, "id">>,
  ) => {
    return useApiPatch(`/tasks/${taskId}/toggle-star`, options);
  };

  const fetchWeeklyGoalTasks = (
    options?: UseApiOptions<TasksWithWeeklyGoalResponse>,
  ) => {
    return useApiGet("/tasks/weekly-goals", options);
  };

  const fetchToggleWeeklyGoalTasks = (
    taskIds?: MaybeRefOrGetter<string[]>,
    options?: UseApiOptions<ToggleWeeklyGoalResponse, Pick<Task, "id">>,
  ) => {
    const ids = () => toValue(taskIds).map((id) => `tasks/${id}/toggle-weekly-goal`);
    return useApiBatch(ids, options);
  };

  return {
    fetchCreateTask,
    fetchAllTasks,
    fetchTargetTask,
    fetchUpdateTask,
    fetchDeleteTargetTask,
    fetchCompleteTask,
    fetchAllStarredTasks,
    fetchTaskWithDeadlines,
    fetchToggleStarTask,
    fetchWeeklyGoalTasks,
    fetchToggleWeeklyGoalTasks,
  };
};
