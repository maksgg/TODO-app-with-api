import type {
  TaskResponse,
  AllTasksResponse,
  CreateTaskRequest,
  CreateTaskResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
  Task,
} from "@/features/tasks/types/index";
import type { UseApiOptions } from "@/shared/api/types";
import { useApiGet, useApiPost, useApiDelete, useApiPatch } from "@/shared/composables";

export default () => {
  const fetchCreateTask = (
    listId: string | string[],
    options?: UseApiOptions<CreateTaskResponse, CreateTaskRequest>,
  ) => {
    return useApiPost(`/tasks/lists/${listId}`, options);
  };

  const fetchAllTasks = (
    listId: string | string[],
    options?: UseApiOptions<AllTasksResponse>,
  ) => {
    return useApiGet(`/tasks/lists/${listId}`, options);
  };

  const fetchTargetTask = (
    taskId: string | string[],
    options?: UseApiOptions<TaskResponse>,
  ) => {
    return useApiGet(`/tasks/${taskId}`, options);
  };

  const fetchUpdateTask = (
    taskId: string | string[],
    options?: UseApiOptions<UpdateTaskResponse, UpdateTaskRequest>,
  ) => {
    return useApiPatch(`/tasks/lists/${taskId}`, options);
  };

  const fetchDeleteTargetTask = (
    taskId: string | string[],
    options?: UseApiOptions<TaskResponse>,
  ) => {
    return useApiDelete(`/tasks/${taskId}`, options);
  };
  type CompleteRequest = {
    completed: boolean;
  };

  const fetchCompleteTask = (
    taskId: string | string[],
    options?: UseApiOptions<TaskResponse, CompleteRequest>,
  ) => {
    return useApiPatch(`/tasks/${taskId}/complete`, options);
  };

  const fetchAllStarredTasks = (
    options?: UseApiOptions<TaskResponse, Pick<Task, "id">>, // check response and set type
  ) => {
    return useApiGet("/tasks/starred/all", options);
  };

  const fetchTaskWithDeadlines = (
    options?: UseApiOptions<any>, // check response and set type
  ) => {
    return useApiGet("/tasks/deadlines", options);
  };

  const fetchToggleStarTask = (
    taskId: string | string[],
    options?: UseApiOptions<TaskResponse, Pick<Task, "id">>, // check response and set type
  ) => {
    return useApiPatch(`/tasks/${taskId}/toggle-star`, options);
  };

  const fetchWeeklyGoalTasks = (
    options?: UseApiOptions<TaskResponse[], Pick<Task, "id">>, // check response and set type
  ) => {
    return useApiGet("/tasks/weekly-goals", options);
  };

  const fetchToggleWeeklyGoalTasks = (
    options?: UseApiOptions<TaskResponse, Pick<Task, "id">>, // check response and set type
  ) => {
    return useApiGet("/tasks/weekly-goals", options);
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
