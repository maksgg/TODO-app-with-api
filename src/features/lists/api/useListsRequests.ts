import { useApiDelete, useApiGet, useApiPatch, useApiPost, type UseApiOptions } from "@ametie/vue-muza-use";
import { type MaybeRefOrGetter, toValue } from "vue";

import type {
  AllListResponse,
  CreateListRequest,
  CreateListResponse,
  UpdateListRequest,
  UpdateListResponse,
  ListResponse,
} from "../types";

export default () => {
  const createUserList = (
    options?: UseApiOptions<CreateListResponse, CreateListRequest>,
  ) => {
    return useApiPost("/lists", options);
  };

  const getAllUserLists = (
    options?: UseApiOptions<AllListResponse>,
  ) => {
    return useApiGet("/lists", options);
  };

  const updateUserLists = (
    listId: MaybeRefOrGetter<string>,
    options?: UseApiOptions<UpdateListResponse, UpdateListRequest>,
  ) => {
    return useApiPatch(() => `/lists/${toValue(listId)}`, options);
  };

  const deleteUserList = (
    listId: MaybeRefOrGetter<string>,
    options?: UseApiOptions<ListResponse>,
  ) => {
    return useApiDelete(() => `/lists/${toValue(listId)}`, options);
  };

  return {
    createUserList,
    getAllUserLists,
    updateUserLists,
    deleteUserList,
  };
};
