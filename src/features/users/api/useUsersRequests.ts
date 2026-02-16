import { useApiGet, useApiPatch, useApiDelete, type UseApiOptions } from "@ametie/vue-muza-use";
import { type MaybeRefOrGetter } from "vue";

import type {
  UserInfo,
  UserRole,
  UserPermissions,
  Permissions,
  PermissionsByRole,
  UsersResponse,
} from "@/shared/types/index";

export default () => {
  const fetchAllUsers = (options?: UseApiOptions<UsersResponse>) => {
    return useApiGet("/users", options);
  };

  const fetchAllUsersPermissions = (options?: UseApiOptions<Permissions[]>) => {
    return useApiGet(`/permissions`, options);
  };
  const fetchUsersPermissionsByRole = (options?: UseApiOptions<PermissionsByRole>) => {
    return useApiGet(`/permissions/roles`, options);
  };

  const fetchTargetUser = (
    id: string | string[],
    options?: UseApiOptions<UserInfo>,
  ) => {
    return useApiGet(`/users/${id}`, options);
  };

  const userRoleUpdate = (
    id: string | string[],
    options?: UseApiOptions<UserInfo, UserRole>,
  ) => {
    return useApiPatch(`/users/${id}/role`, options);
  };

  const userPermissionsUpdate = (
    id: string | string[],
    options?: UseApiOptions<UserInfo, UserPermissions>,
  ) => {
    return useApiPatch(`/users/${id}/permissions`, options);
  };

  const deleteTargetUser = (
    id: MaybeRefOrGetter<string>,
    options?: UseApiOptions<UserInfo>,
  ) => {
    return useApiDelete(() => `/users/${id}`, options);
  };

  return {
    fetchAllUsers,
    fetchTargetUser,
    fetchAllUsersPermissions,
    fetchUsersPermissionsByRole,
    userRoleUpdate,
    userPermissionsUpdate,
    deleteTargetUser,
  };
};
