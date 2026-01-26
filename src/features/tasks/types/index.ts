import type { Pagination, Response } from "@/shared/types/index";

type TaskStatus = "todo" | "done" | boolean;
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

type CreateTaskRequest = Partial<Omit<Task, "id" | "listId" | "createdAt" | "updatedAt" | "deletedAt">>;

type UpdateTaskRequest = Partial<CreateTaskRequest>;

type CreateTaskResponse = Task;

type UpdateTaskResponse =  Task;

type TaskResponse = Task;

type AllTasksResponse = Response<Task, Pagination>;

export type {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  CreateTaskResponse,
  UpdateTaskResponse,
  AllTasksResponse,
  TaskResponse,
};
