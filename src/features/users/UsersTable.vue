<script setup lang="ts">
import { debouncedRef } from "@vueuse/core";
import { ref } from "vue";
import { useRouter } from "vue-router";

import useUsersRequests from "./api/useUsersRequests";
import UsersTableSkeleton from "./components/UsersTableSkeleton.vue";

import { useModal } from "@/shared/composables/useModal";
import { FilterConfig, TableParams } from "@/shared/types";
import VButton from "@/shared/ui/common/VButton.vue";
import VDropDown from "@/shared/ui/common/VDropDown.vue";
import VModal from "@/shared/ui/common/VModal.vue";
import VToolbar from "@/shared/ui/common/VToolbar.vue";
import VTable from "@/shared/ui/table/VTable.vue";
import { firstLetterUp, formatDate } from "@/shared/utils/index";

const usersHeader = [
  { key: "member", label: "Member", width: "45%" },
  { key: "role", label: "Role" },
  { key: "createdAt", label: "Registered" },
  { key: "actions", label: "Actions", textAlign: "text-end", width: "30%" },
];
const toolbarConfig: FilterConfig = [
  {
    key: "role",
    label: "Role",
    options: [
      { name: "All roles", value: "all" },
      { name: "User", value: "user" },
      { name: "Admin", value: "admin" },
    ],
  },
];
const tableActions = [
  { value: "user", label: "User Profile" },
  { value: "delete", label: "Remove user", dangerous: true },
];

const targetUser = ref({ id: "", name: "" });
const router = useRouter();
const searchQuery = ref("");
const debounceSearch = debouncedRef<string>(searchQuery, 700);
const tablePayloadParams = ref({
  limit: 20,
  sort: "createdAt",
  order: "desc",
  role: { name: "All roles", value: "all" }, //toolbarConfig[0].options[0].name
});

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

const usersActions = (value: string, user: { id: string, name: string }) => {
  switch (value) {
    case "user": targetUserInfo(user.id); break;
    case "delete": openModal(user); break;
  }
};

const targetUserInfo = (id: string) => router.replace({ name: "profile", query: { id } });

const requestSortTable = (params: TableParams) => {
  return tablePayloadParams.value = {
    ...tablePayloadParams.value,
    limit: params.limit,
    sort: params?.sort || "createdAt",
    order: params?.order || "desc",
  };
};
</script>

<template>
  <h1 class="text-headPrimary text-txtPrimary">
    User Management
  </h1>
  <UsersTableSkeleton v-if="usersLoader && !usersData?.data?.length" />
  <VTable
    v-else
    :header="usersHeader"
    :rows="usersData?.data"
    :loader="usersLoader"
    :searchable="true"
    :pagination="usersData?.pagination"
    @request="requestSortTable"
  >
    <template #toolBar>
      <VToolbar
        v-model:search="searchQuery"
        v-model:filters="tablePayloadParams"
        :filter-configs="toolbarConfig"
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
        {{ firstLetterUp(row.role) }}
      </span>
    </template>
    <template #col-createdAt="{ row }">
      <span class="truncate text-uiCaption text-secondary">
        {{ formatDate(row.createdAt, "long") }}
      </span>
    </template>
    <template #col-actions="{ row, index }">
      <div class="flex flex-wrap justify-end gap-5">
        <VDropDown
          :options="tableActions"
          trigger="icon"
          :placement="index >= usersData?.data.length - 1 ? 'topRight' : 'bottomRight'"
          class="text-primary"
          @action="(val) => usersActions(val, row as { id: string; name: string; })"
        />
      </div>
    </template>
  </VTable>
  <VModal
    id="delete-user"
    title="Remove user"
  >
    <div class="flex flex-col gap-2 text-center">
      <h4 class="text-uiHead text-txtPrimary">
        Are you sure you want to remove <span>"{{ targetUser.name }}"</span> user?
      </h4>
      <p class="text-bodyM text-secondary">
        This action can’t be undone
      </p>
    </div>
    <template #footer>
      <div class="flex justify-center gap-4">
        <VButton
          text="Cancel"
          class="!bg-transparent text-primary"
          @click="modal.close()"
        />
        <VButton
          text="Remove user"
          variant="dangerous"
          :loader="deleteUserLoader"
          @click="deleteUser"
        />
      </div>
    </template>
  </VModal>
</template>
