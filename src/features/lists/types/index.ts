import type { Pagination, Response } from "@/shared/types/index";

type User = {
  id: string;
  email: string;
  name: string;
};

type List = {
  id: string;
  title: string;
  deadline: string;
  ownerId: User | string; // check docs
  createdAt: string;
  updatedAt: string;
  totalTasks: number;
  completedTasks: number;
};

type CreateListRequest = Pick<List, "title" | "deadline">;

type UpdateListRequest = Partial<CreateListRequest>;

type CreateListResponse = List;

type UpdateListResponse = List;

type ListResponse = List;

type AllListResponse = Response<List, Pagination>;

//// tasks types
type TaskStatus = "todo" | "in-progress" | "done";
type TaskPriority = "low" | "medium" | "high";

type Task = {
  id?: string;
  listId: string;
  title: string;
  description: string;
  longDescription: string;
  status: TaskStatus;
  priority: TaskPriority;
  order: number;
  tags: string[];
  isStarred: boolean;
  dueDate: string;
  deadline: string;
  completedAt?: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
};

type CreateTaskRequest = Omit<Task, "id" | "listId" | "createdAt" | "updatedAt">;

type UpdateTaskRequest = Partial<CreateTaskRequest>;

type CreateTaskResponse = Task;

type UpdateTaskResponse =  Task;

type TaskResponse = Task;

type AllTasksResponse = Response<Task, Pagination>;

// analytics types

type ListAnalytics = {
  total: number;
};

type TaskAnalytics = {
  total: number;
  completed: number;
  archived: number;
  todo: number;
  inProgress: number;
};

type AnalyticsResponse = {
  lists: ListAnalytics;
  tasks: TaskAnalytics;
};

export type {
  List,
  Task,
  CreateListRequest,
  CreateListResponse,
  UpdateListRequest,
  UpdateListResponse,
  AllListResponse,
  CreateTaskRequest,
  UpdateTaskRequest,
  CreateTaskResponse,
  UpdateTaskResponse,
  AllTasksResponse,
  ListResponse,
  TaskResponse,
  AnalyticsResponse,
};
