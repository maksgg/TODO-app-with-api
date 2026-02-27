<script setup lang="ts">
import { debouncedRef } from "@vueuse/core";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import useUsersRequests from "./api/useUsersRequests";
import UsersTableSkeleton from "./components/UsersTableSkeleton.vue";

import { useModal } from "@/shared/composables/useModal";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import type { TableParams, UserInfo } from "@/shared/types";
import VButton from "@/shared/ui/common/VButton.vue";
import VDropDown from "@/shared/ui/common/VDropDown.vue";
import VModal from "@/shared/ui/common/VModal.vue";
import VTitle from "@/shared/ui/common/VTitle.vue";
import VToolbar from "@/shared/ui/common/VToolbar.vue";
import VTable from "@/shared/ui/table/VTable.vue";
import { formatDate } from "@/shared/utils/index";

const { t } = useI18n();

const targetUser = ref({ id: "", name: "" });
const router = useRouter();
const searchQuery = ref("");
const debounceSearch = debouncedRef<string>(searchQuery, 700);
const tablePayloadParams = ref({
  limit: 20,
  sort: "createdAt",
  order: "desc",
  role: { name: t("usersTable.toolbar.all_roles"), value: "all" },
});

const usersHeader = computed(() => [
  { key: "member", label: t("usersTable.tableHead.member"), width: "45%" },
  { key: "role", label: t("usersTable.tableHead.role") },
  { key: "createdAt", label: t("usersTable.tableHead.registered") },
  { key: "actions", label: t("usersTable.tableHead.actions"), textAlign: "text-end", width: "30%" },
]);
const toolbarConfig = computed(() => [
  {
    key: "role",
    label: "Role",
    options: [
      { name: t("usersTable.toolbar.all_roles"), value: "all" },
      { name: t("usersTable.toolbar.user"), value: "user" },
      { name: t("usersTable.toolbar.admin"), value: "admin" },
    ],
  },
]);
const toolbarSelect = computed({
  get: () => tablePayloadParams.value,
  set: (option) => tablePayloadParams.value.role = { ...option.role },
});
const tableActions = computed(() => [
  { value: "user", label: t("usersTable.actions.user_profile") },
  { value: "delete", label: t("usersTable.actions.remove_user"), disabled: !authStore.isAllowed("delete:user"), dangerous: true },
]);

const authStore = useAuthStore();
const { fetchAllUsers, deleteTargetUser } = useUsersRequests();

const {
  data: usersData,
  loading: usersLoader,
  execute: usersResponse,
} = fetchAllUsers({
  immediate: true,
  watch: [tablePayloadParams, debounceSearch],
  params: () => ({
    ...tablePayloadParams.value,
    q: debounceSearch.value,
    role: tablePayloadParams.value.role.value !== "all" ?
      tablePayloadParams.value.role.value : undefined,
  }),
});

const modal = useModal("delete-user");

const openModal = (user: { id: string, name: string }) => {
  targetUser.value = { id: user.id, name: user.name };
  modal.open();
};

const {
  execute: deleteUser,
  loading: deleteUserLoader,
} = deleteTargetUser(() => targetUser.value.id, {
  onSuccess: () => {
    usersResponse();
    modal.close();
    targetUser.value = { id: "", name: "" };
  },
},
);

const usersActions = (value: string, user: UserInfo) => {
  switch (value) {
    case "user": targetUserInfo(user.id); break;
    case "delete": openModal(user); break;
  }
};

const targetUserInfo = (id: string) => router.replace({ name: "profile", query: { id } });

const requestSortTable = (params: TableParams) => {
  tablePayloadParams.value = {
    ...tablePayloadParams.value,
    limit: params.limit,
    sort: params?.sort || tablePayloadParams.value.sort,
    order: params?.order || tablePayloadParams.value.order,
  };
};
</script>

<template>
  <VTitle :title="$t('users.title.user_management')" />
  <UsersTableSkeleton v-if="usersLoader && !usersData?.data?.length" />
  <VTable
    v-else
    :header="usersHeader"
    :rows="usersData?.data"
    :loader="usersLoader"
    :searchable="true"
    :show-filters="true"
    :pagination="usersData?.pagination"
    @request="requestSortTable"
  >
    <template #toolBar>
      <VToolbar
        v-model:search="searchQuery"
        v-model:filters="toolbarSelect"
        :filter-configs="toolbarConfig"
        :placeholder="$t('usersTable.toolbar.search')"
        class="col-span-full"
      />
    </template>
    <template #col-member="{ row }">
      <div class="flex flex-col justify-center min-w-0">
        <span class="truncate text-bodyM text-txtPrimary">{{ row.name }}</span>
        <span class="truncate text-uiCaption text-secondary">{{ row.email }}</span>
      </div>
    </template>
    <template #col-role="{ row }">
      <span
        :class="['truncate text-toggle', row.role === 'admin' ? 'text-uiLabel' : 'text-bodyM']"
      >
        {{ $t(`usersTable.toolbar.${row.role}`) }}
      </span>
    </template>
    <template #col-createdAt="{ row }">
      <span class="truncate text-uiCaption text-secondary">
        {{ formatDate(row.createdAt, "long", $i18n.locale) }}
      </span>
    </template>
    <template #col-actions="{ row, index }">
      <div class="flex flex-wrap justify-end gap-5">
        <VDropDown
          :options="tableActions"
          trigger="icon"
          icon-type="horizontalDots"
          :placement="index >= usersData?.data.length - 1 ? 'topRight' : 'bottomRight'"
          @action="(val) => usersActions(val, row as UserInfo)"
        />
      </div>
    </template>
  </VTable>
  <VModal
    id="delete-user"
    :title="$t('usersModal.remove_user')"
  >
    <div class="flex flex-col gap-2 text-center">
      <h4 class="text-uiHead text-txtPrimary">
        {{ $t('usersModal.are_you_sure_you_want_to_remove') }}
        <span>"{{ targetUser.name }}"</span>
        {{ $t('usersModal.user?') }}
      </h4>
      <p class="text-bodyM text-secondary">
        {{ $t('usersModal.this_action_can’t_be_undone') }}
      </p>
    </div>
    <template #footer>
      <div class="flex justify-center gap-4">
        <VButton
          :text="$t('usersModal.btn.cancel')"
          class="!bg-transparent text-primary"
          @click="modal.close()"
        />
        <VButton
          :text="$t('usersModal.remove_user')"
          variant="dangerous"
          :loader="deleteUserLoader"
          @click="deleteUser"
        />
      </div>
    </template>
  </VModal>
</template>
