import type { Pagination, Response } from "@/shared/types/index";

type User = {
  id: string;
  email: string;
  name: string;
};
type TaskItem = {
  id: string;
  title: string;
  status: string;
};

type List = {
  _id: string;
  title: string;
  deadline: string;
  hexColor: string;
  ownerId: User | string;
  tasks: TaskItem[];
  createdAt: string;
  updatedAt: string;
  totalTasks: number;
  completedTasks: number;
};

type CreateListRequest = Pick<List, "title" | "hexColor">;

type UpdateListRequest = Partial<CreateListRequest>;

type CreateListResponse = List;

type UpdateListResponse = List;

type ListResponse = List;

type AllListResponse = Response<List, Pagination>;

type ModalType = "delete" | "edit" | "create";

type SelectOption = {
  name: string;
  value: string;
};

type FilterConfig = {
  key: string;
  label: string;
  options: SelectOption[];
};

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
  CreateListRequest,
  CreateListResponse,
  UpdateListRequest,
  UpdateListResponse,
  AllListResponse,
  ListResponse,
  AnalyticsResponse,
  ModalType,
  FilterConfig,
};
