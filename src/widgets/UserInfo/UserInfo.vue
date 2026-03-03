<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import ProfileOverview from "@/features/profile/components/ProfileOverview.vue";
import useUsersRequests from "@/features/users/api/useUsersRequests";
import UserInfoPermissionsList from "@/features/users/components/UserInfoPermissionsList.vue";
import type {  UserPayload } from "@/shared/types";
import VButton from "@/shared/ui/common/VButton.vue";

const route = useRoute();

const {
  fetchTargetUser,
  fetchAllUsersPermissions,
  userRoleUpdate,
  userPermissionsUpdate,
  fetchUsersPermissionsByRole,
} = useUsersRequests();

const {
  data: permissionsData,
  loading: fetchPermissionsLoader,
  execute: getAllPermissions,
} = fetchAllUsersPermissions();

const {
  data: permissionsByRoles,
  loading: permissionsByRoleLoader,
  execute: getPermissionsByRole,
} = fetchUsersPermissionsByRole();

const {
  data: user,
  loading: userLoader,
  execute: getTargetUserInfo,
} = fetchTargetUser(route.query.id);

const {
  execute: roleUpdate,
  loading: roleLoader,
} = userRoleUpdate(route.query.id);

const {
  execute: permissionsUpdate,
  loading: permissionsLoader,
} = userPermissionsUpdate(route.query.id, {
  onSuccess: ({ data }) => user.value = data,
});

const mainLoader = computed(
  () => permissionsLoader.value ||
  roleLoader.value ||
  userLoader.value ||
  fetchPermissionsLoader.value ||
  permissionsByRoleLoader.value,
);

const updatedUserData = async (payload: UserPayload) => {
  if(payload.role) {
    await roleUpdate({ data: { role: payload.role } });
  }

  await permissionsUpdate({ data: { permissions: payload.permissions } });
};

onMounted(async () => {
  await Promise.all([
    getAllPermissions(),
    getPermissionsByRole(),
    getTargetUserInfo(),
  ]);
});
</script>

<template>
  <ProfileOverview
    :user-data="user"
    :loader="userLoader"
  >
    <div class="flex gap-2">
      <VButton
        icon="chevronLeft"
        variant="ghost"
        to="/users"
        class="text-secondary"
      />
      <span class="text-bodyM text-muted">{{ $t('userInfo.title.all_members') }}</span>
    </div>
  </ProfileOverview>
  <UserInfoPermissionsList
    :user="user"
    :loader="mainLoader"
    :permissions-data="permissionsData"
    :permissions-by-roles="permissionsByRoles"
    @updated="updatedUserData"
  />
</template>
