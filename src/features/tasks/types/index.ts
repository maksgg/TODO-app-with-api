import type { Pagination/* , Response */ } from "@/shared/types/index";

type ListInfo = {
  createdAt: string
  deadline: string
  hexColor: string
  id: string
  ownerId: string
  title: string
  updatedAt: string
};
type TaskListInfo = {
  title: string;
  id: string;
  deadline: string | null;
  hexColor: string | null;
};

type TaskStatus = "todo" | "done" | boolean;
type TaskPriority = "low" | "medium" | "high";
type TasksModals = "create" | "edit" | "delete";

type Task = {
  id?: string;
  listId: TaskListInfo;
  title: string;
  description: string;
  longDescription: string;
  status: TaskStatus;
  priority: TaskPriority;
  order: number;
  tags: string[];
  isStarred: boolean;
  isWeeklyGoal: boolean;
  dueDate: string;
  deadline: string;
  completedAt?: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
  deadlineWord?: string; // only in front-end
};

type TasksDeadlinesResponse = {
  data: Task[];
  total: number;
};

type TasksWithWeeklyGoalResponse = TasksDeadlinesResponse;

type ToggleWeeklyGoalResponse = Task;

type CreateTaskRequest = Partial<Omit<Task, "id" | "listId" | "createdAt" | "updatedAt" | "deletedAt">>;

type UpdateTaskRequest = Partial<CreateTaskRequest>;

type CreateTaskResponse = Task;

type UpdateTaskResponse =  Task;

type TaskResponse = Task;

// type AllTasksResponse = Response<Task, Pagination>;

type TaskRequestParams = {
  limit?: number;
  sort: string;
  order: string;
  priority?: string;
};

type AllTasksResponse = {
  data: Task[];
  listInfo: ListInfo;
  pagination: Pagination;
};

type ModalFields = {
  title: string,
  tags: string,
  deadline: Date | null,
  dueDate: Date | null,
  priority: { name: string, value: string },
};

export type {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  CreateTaskResponse,
  UpdateTaskResponse,
  AllTasksResponse,
  TaskResponse,
  TasksDeadlinesResponse,
  ToggleWeeklyGoalResponse,
  TasksWithWeeklyGoalResponse,
  ModalFields,
  TaskRequestParams,
  TasksModals,
};
