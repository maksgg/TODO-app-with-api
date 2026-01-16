import type { UseApiOptions } from "@/shared/api/types";
import { useApiGet, useApiPatch, useApiDelete } from "@/shared/composables";
import type { AdminResponse, UserInfo, UserRole, UserPermissions, Permissions  } from "@/shared/types/index";

export default () => {
  const fetchAllUsers = (options?: UseApiOptions<AdminResponse>) => {
    return useApiGet("/users", options);
  };

  const fetchAllUsersPermissions = (options?: UseApiOptions<Permissions[]>) => {
    return useApiGet(`/permissions`, options);
  };
  const fetchUsersPermissionsByRole = (options?: UseApiOptions<any[]>) => {
    return useApiGet(`/permissions/roles`, options);
  };

  const fetchTargetUser = (
    id: string | string[],
    options?: UseApiOptions<UserInfo>,
  ) => {
    return useApiGet(`/users/${id}`, options);
  };

  const deleteTargetUser = (
    id: string | string[],
    options?: UseApiOptions<UserInfo>,
  ) => {
    return useApiDelete(`/users/${id}`, options);
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

  return {
    fetchAllUsers,
    fetchTargetUser,
    deleteTargetUser,
    fetchAllUsersPermissions,
    fetchUsersPermissionsByRole,
    userRoleUpdate,
    userPermissionsUpdate,
  };
};
