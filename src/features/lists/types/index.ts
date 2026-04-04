import { Ref } from "vue";

import type { Pagination, Response } from "@/shared/types/index";

type RequestParams = {
  q: string;
  sort: string;
  order: string;
  isOwn?: boolean;
};

type User = {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
};

type TaskItem = {
  id: string;
  title: string;
  status: string;
  isWeeklyGoal: boolean;
};

type List = {
  _id: string;
  title: string;
  deadline: string;
  hexColor: string;
  owner: User;
  tasks: TaskItem[];
  createdAt: string;
  updatedAt: string;
  totalTasks: number;
  completedTasks: number;
};

type UserGroupInfo = {
  isExpanded: boolean;
  disabled?: boolean;
  totalLists: number;
  userListsInfo: {
    ownerId: string;
    name: string;
    email: string;
    role: string;
    allTitles: { listId: string; title: string; totalTasks: number }[]
  }
};

type CreateListRequest = Pick<List, "title" | "hexColor">;

type UpdateListRequest = Partial<CreateListRequest>;

type CreateListResponse = List;

type UpdateListResponse = List;

type ListResponse = List;

type AllListResponse = Response<List, Pagination>;

type ListModal = "create" | "edit" | "delete";

type ListOptions = {
  params: () => RequestParams;
  filters: Ref<Record<"search" | "sort", string>>;
};

export type {
  List,
  UserGroupInfo,
  CreateListRequest,
  CreateListResponse,
  UpdateListRequest,
  UpdateListResponse,
  AllListResponse,
  ListResponse,
  ListModal,
  RequestParams,
  ListOptions,
};
