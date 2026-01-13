<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

import UserInfoPermissionsList from "./components/UserInfoPermissionsList.vue";
import UserInfoSidebar from "./components/UserInfoSidebar.vue";

import useUsersRequests from "@/features/users/api/useUsersRequests";
import type { Tabs, UserPayload } from "@/shared/types";
import VTabs from "@/shared/ui/common/VTabs.vue";

const activeTab = ref<string>("permissionsAndAccess");
const tabs: Tabs[] = [
  { id: "permissionsAndAccess", label: "Permissions&Access" },
];
const route = useRoute();

const {
  fetchTargetUser,
  fetchAllUsersPermissions,
  userRoleUpdate,
  userPermissionsUpdate,
} = useUsersRequests();

const { data: permissionsData, loading: fetchPermissionsLoader } = fetchAllUsersPermissions({
  immediate: true,
});

const { data: user, loading: userLoader } = fetchTargetUser(route.params.id, {
  immediate: true,
});

const {
  execute: roleUpdate,
  loading: roleLoader,
} = userRoleUpdate(route.params.id);

const {
  execute: permissionsUpdate,
  loading: permissionsLoader,
} = userPermissionsUpdate(route.params.id, {
  onSuccess: ({ data }) => {
    user.value = data;
  },
});

const mainLoader = computed(
  () => permissionsLoader.value ||
  roleLoader.value ||
  userLoader.value ||
  fetchPermissionsLoader.value,
);
const tabComponents = {
  permissionsAndAccess: UserInfoPermissionsList,
};
const activeTabComponent = computed(
  () => tabComponents[activeTab.value] || UserInfoPermissionsList,
);

const updatedUserData = async (payload: UserPayload) => {
  if(payload.role) {
    await roleUpdate({ data: { role: payload.role } });
  }

  await permissionsUpdate({ data: { permissions: payload.permissions } });
};
</script>

<template>
  <div class="flex-1 grid grid-cols-4 grid-rows-[auto_1fr] gap-5">
    <UserInfoSidebar
      :user-data="user"
      :loader="mainLoader"
      class="row-span-2 col-span-1"
    />
    <VTabs
      v-model="activeTab"
      :tabs="tabs"
      :loader="mainLoader"
      class="col-span-3"
    />
    <component
      :is="activeTabComponent"
      :user="user"
      :loader="mainLoader"
      :permissions-data="permissionsData"
      class="col-span-3"
      @updated="updatedUserData"
    />
  </div>
</template>
