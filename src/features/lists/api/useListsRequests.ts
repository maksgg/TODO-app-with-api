import type {
  AllListResponse,
  CreateListRequest,
  CreateListResponse,
  UpdateListRequest,
  UpdateListResponse,
  ListResponse,
} from "../types";

import type { UseApiOptions } from "@/shared/api/types";
import { useApiDelete, useApiGet, useApiPatch, useApiPost } from "@/shared/composables";

export default () => {
  const createUserList = (
    options?: UseApiOptions<CreateListResponse, CreateListRequest>,
  ) => {
    return useApiPost("/lists", options);
  };

  const fetchAllUserLists = (
    options?: UseApiOptions<AllListResponse>,
  ) => {
    return useApiGet("/lists", options);
  };

  const fetchTargetUserLists = (
    listId: string | string[],
    options?: UseApiOptions<ListResponse>,
  ) => {
    return useApiGet(`/lists/${listId}`, options);
  };

  const updateUserLists = (
    listId: string | string[],
    options?: UseApiOptions<UpdateListResponse, UpdateListRequest>,
  ) => {
    return useApiPatch(`/lists/${listId}`, options);
  };

  const deleteUserList = (
    listId: string | string[],
    options?: UseApiOptions<ListResponse>,
  ) => {
    return useApiDelete(`/lists/${listId}`, options);
  };

  return {
    createUserList,
    fetchAllUserLists,
    fetchTargetUserLists,
    updateUserLists,
    deleteUserList,
  };
};
