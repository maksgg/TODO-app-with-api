<script setup lang="ts">
import { watch, ref, computed } from "vue";

import UserInfoPermissionsSkeletonList from "./UserInfoPermissionsSkeletonList.vue";

import { UserInfo, Roles, Permissions, UserPayload, PermissionsByRole } from "@/shared/types";
import VButton from "@/shared/ui/common/VButton.vue";
import VContainer from "@/shared/ui/common/VContainer.vue";
import VList from "@/shared/ui/common/VList.vue";
import VMultiselect from "@/shared/ui/common/VMultiselect.vue";
import VSwitch from "@/shared/ui/common/VSwitch.vue";

const userRoles: Roles[] = [
  { name: "User", value: "user" }, { name: "Administrator", value: "admin"  },
];

const {
  loader,
  user,
  permissionsData,
  permissionsByRoles,
} = defineProps<{
  loader: boolean;
  user: UserInfo | null;
  permissionsData: Permissions[] | null,
  permissionsByRoles: PermissionsByRole | null
}>();

const emit = defineEmits<{ "updated": [payload: UserPayload] }>();

const checkboxMap = ref<Record<string, boolean>>({});
const changedRole = ref<Roles | null>(null);
const selectedAll = ref<boolean>(false);

const selectedPermissions = computed(() => {
  return Object.keys(checkboxMap.value).filter((key) => checkboxMap.value[key]);
});

const isDisabled = computed(() => changedRole.value?.value === "admin");

const updateUser = () => {
  const payload: UserPayload = {
    role: user?.role === changedRole.value.value ? undefined : changedRole.value.value,
    permissions: selectedPermissions.value,
  };

  emit("updated", payload);
};

watch(
  () => user?.role,
  (newRole) => {
    if (!newRole) return;

    changedRole.value = userRoles.find(el => el.value === user.role);
  },
  { immediate: true },
);

watch(
  [() => changedRole.value?.value, selectedAll],
  ([newRole, newAll], [oldRole, oldAll]) => {
    if (!permissionsByRoles || !permissionsData) return;

    const roleChanged = newRole !== oldRole;
    const selectAllChanged = newAll !== oldAll;

    if (roleChanged) {
      checkboxMap.value = {};

      if (newRole === "admin") {
        permissionsByRoles.ADMIN.forEach(p => checkboxMap.value[p] = true);
        selectedAll.value = true;
      }
      if(newRole === "user") {
        permissionsByRoles?.USER.forEach(p => checkboxMap.value[p] = true);
      }
      return;
    }

    if (selectAllChanged && newRole !== "admin") {
      permissionsData.forEach(p => {
        checkboxMap.value[p.value] = newAll;
      });
    }
  });
</script>

<template>
  <UserInfoPermissionsSkeletonList v-if="loader" />
  <VContainer v-else>
    <template #header>
      <div class="flex justify-between items-center gap-5 mb-5">
        <div class="flex gap-20">
          <VMultiselect
            v-model:model="changedRole"
            :options="userRoles"
          />
          <VSwitch
            v-model="selectedAll"
            text="Select all"
            variant="primary"
            size="sm"
            :disabled="isDisabled"
          />
        </div>
        <VButton
          text="Save"
          icon="save"
          @click="updateUser"
        />
      </div>
    </template>
    <template #footer>
      <VList
        :list-items="permissionsData || []"
        class="grid grid-cols-2 gap-3 text-text-color"
      >
        <template #default="{ item }: Record<string, any>">
          <VSwitch
            v-model="checkboxMap[item.value]"
            :text="item.description"
            :disabled="isDisabled"
            variant="primary"
            size="sm"
          />
        </template>
      </VList>
    </template>
  </VContainer>
</template>
