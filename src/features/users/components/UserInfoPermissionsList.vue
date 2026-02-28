<script setup lang="ts">
import { watch, ref, computed } from "vue";
import { useI18n } from "vue-i18n";

import UserInfoPermissionsListSkeleton from "./UserInfoPermissionsListSkeleton.vue";
import { formatPermissionsByGroups } from "../utils/formatPermissionsByGroups";

import { useAuthStore } from "@/shared/stores/useAuthStore";
import type { UserInfo, Roles, Permissions, UserPayload, PermissionsByRole } from "@/shared/types";
import VButton from "@/shared/ui/common/VButton.vue";
import VCheckbox from "@/shared/ui/common/VCheckbox.vue";
import VContainer from "@/shared/ui/common/VContainer.vue";
import VMultiselect from "@/shared/ui/common/VMultiselect.vue";
import VSwitch from "@/shared/ui/common/VSwitch.vue";
import VTitle from "@/shared/ui/common/VTitle.vue";

const authStore = useAuthStore();
const { t } = useI18n();
const userRoles = computed<Roles[]>(() => [
  { name: t("usersInfo.role.user"), value: "user" },
  { name: t("usersInfo.role.administrator"), value: "admin"  },
]);

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

const selectedPermissions = computed(() => {
  return Object.keys(checkboxMap.value).filter((key) => checkboxMap.value[key]);
});
const formattedPermissions = computed(() => formatPermissionsByGroups(permissionsData));
const isDisabled = computed(
  () => changedRole.value?.value === "admin" || !authStore.isAllowed("manage:permissions"));
const isChanged = computed(() => {
  if (!user) return false;

  const isRoleChanged = changedRole.value?.value !== user.role;
  const current = [...selectedPermissions.value].sort().join(",");
  const initial = [...(user.permissions || [])].sort().join(",");
  const arePermissionsChanged = current !== initial;

  return isRoleChanged || arePermissionsChanged;
});
const isAllSelected = computed({
  get: () => permissionsData?.every((el) => checkboxMap.value[el.value]) ?? false,
  set: (val: boolean) => permissionsData?.forEach(el => checkboxMap.value[el.value] = val),
});

const setupPermissions = (permissionsList: string[]) => {
  if (!permissionsData) return;
  const newMap: Record<string, boolean> = {};
  permissionsData.forEach(p => (newMap[p.value] = false));
  permissionsList.forEach(p => {
    if (newMap[p] !== undefined) newMap[p] = true;
  });

  checkboxMap.value = newMap;
};

const roleChange = (newRole: Roles | null) => {
  if (newRole?.value && permissionsByRoles) {
    const roleKey = newRole.value.toUpperCase();
    setupPermissions(permissionsByRoles[roleKey]);
  }
};

const updateUser = () => {
  const payload: UserPayload = {
    role: user?.role === changedRole.value?.value ? undefined : changedRole.value.value,
    permissions: selectedPermissions.value,
  };

  emit("updated", payload);
};

watch(
  () => loader,
  (newValue) => {
    if (!newValue && user) {
      changedRole.value = userRoles.value.find(el => el.value === user.role);

      if (user.permissions) {
        setupPermissions(user.permissions);
      }
    }
  },
  { immediate: true },
);
</script>

<template>
  <UserInfoPermissionsListSkeleton v-if="loader" />
  <div
    v-else
    class="flex flex-col gap-6"
  >
    <VTitle :title="$t('usersInfo.title.permissions_&_Access')" />
    <VContainer>
      <template #header>
        <VMultiselect
          v-model:model="changedRole"
          :options="userRoles"
          :disabled="!authStore.isAllowed('manage:roles')"
          :title="$t('usersInfo.title.role')"
          class="w-[11rem]"
          @update:model="roleChange"
        />
        <VCheckbox
          v-model="isAllSelected"
          :text="$t('usersInfo.text.select_all_permissions')"
          :disabled="isDisabled"
        />
      </template>
      <div class="grid grid-cols-2 gap-8">
        <div
          v-for="list in formattedPermissions"
          :key="list.group"
          class="flex flex-col gap-4"
        >
          <span class="text-headingCard text-txtPrimary">{{ list.group }}</span>
          <div
            v-for="el in list.items"
            :key="el.value"
          >
            <VSwitch
              v-model="checkboxMap[el.value]"
              :text="$t(`usersInfo.permissionsList.${el.value.replace(/:/g, '_')}`)"
              :disabled="isDisabled"
              variant="primary"
            />
          </div>
        </div>
      </div>
      <template #footer>
        <VButton
          :text="$t('usersInfo.btn.save_changes')"
          class="ml-auto"
          :disabled="!isChanged || loader"
          @click="updateUser"
        />
      </template>
    </VContainer>
  </div>
</template>
