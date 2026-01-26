<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";
import { useRouter } from "vue-router";

import useUsersRequests from "./api/useUsersRequests";

import { TableParams } from "@/shared/types";
import VDropDown from "@/shared/ui/common/VDropDown.vue";
import VModal from "@/shared/ui/common/VModal.vue";
import VTable from "@/shared/ui/common/VTable.vue";
import VToolbar from "@/shared/ui/common/VToolbar.vue";
import { formatDate } from "@/shared/utils/index";

const isOpen = ref(false);
const userId = ref<string | null>(null);
const router = useRouter();
const pagination = ref({
  limit: 20,
  hasMore: false,
});
const toolBar = ref({
  searchField: "",
  role: { name: "All roles", value: "all" },
});

const { fetchAllUsers, deleteTargetUser } = useUsersRequests();

const {
  data: usersData,
  loading: mainLoader,
  execute: usersResponse,
} = fetchAllUsers({
  onSuccess: ({ data }) => {
    data.data.forEach(el => el.createdAt = formatDate(el.createdAt, "long"));
    pagination.value = data.pagination;
  },
  debounce: 500,
});

const targetUserName = computed(
  () => usersData.value?.data.find((el) => el.id === userId.value)?.name,
);

const openModal = (id: string) => {
  isOpen.value = true;
  userId.value = id;
};

const closeModal = () => isOpen.value = false;

const deleteUser = async () => {
  mainLoader.value = true;
  const { execute } = deleteTargetUser(userId.value);

  await Promise.all([
    execute(),
    loadData(),
  ]);
  isOpen.value = false;
  userId.value = null;
  mainLoader.value = false;
};

const loadData = async (params?: TableParams) => {
  const queryParams: TableParams = {
    limit: params?.limit || 20,
    sort: params?.sort || "createdAt",
    order: params?.order || "desc",
    q: toolBar.value.searchField,
  };

  if (toolBar.value.role.value !== "all") {
    queryParams.role = toolBar.value.role.value as "user" | "admin";
  }

  await usersResponse({ params: queryParams });
};

const userHeader = [
  { key: "member", label: "Member", width: "45%" },
  { key: "role", label: "Role" },
  { key: "createdAt", label: "Registered" },
  { key: "actions", label: "Actions", textAlign: "text-end", width: "30%" },
];
const toolbarConfig = [
  {
    key: "role",
    label: "Sort by",
    options: [
      { name: "All roles", value: "all" },
      { name: "User", value: "user" },
      { name: "Admin", value: "admin" },
    ],
  },
];
const tableActions = [
  { value: "user", label: "User Profile" },
  { value: "remove", label: "Remove user", dangerous: true },
];

const actions = (id: string, value: string) => {
  switch (value) {
    case "user": targetUserInfo(id);
      break;
    case "remove": openModal(id);
      break;
  }
};

const targetUserInfo = (id: string) => router.push({ name: "user", params: { id } });

const requestSortTable = (params: TableParams) => loadData(params);

watch(
  toolBar,
  (newValue) => {
    loadData({
      q: newValue.searchField,
      role: newValue.role.value as "user" | "admin",
    });
  },
  { deep: true },
);

onMounted(() => loadData());
</script>

<template>
  <div class="relative flex flex-col h-screen px-12 py-6">
    <h1 class="text-4xl font-semibold">
      User Management
    </h1>
    <VTable
      :header="userHeader"
      :rows="usersData?.data"
      :loader="mainLoader"
      :searchable="true"
      :pagination="pagination"
      @request="requestSortTable"
    >
      <template #toolBar>
        <VToolbar
          v-model:search="toolBar.searchField"
          v-model:filters="toolBar"
          :filter-configs="toolbarConfig"
          class="col-span-full"
        />
      </template>
      <template #col-member="{ row }">
        <div class="flex flex-col justify-center min-w-0">
          <span class="truncate text-bodyM">{{ row.name }}</span>
          <span class="truncate text-uiCaption">{{ row.email }}</span>
        </div>
      </template>
      <template #col-actions="{ row }">
        <div class="flex flex-wrap justify-end gap-5">
          <VDropDown
            :id="row.id"
            :items="tableActions"
            trigger="icon"
            placement="bottomRight"
            @action="actions"
          />
        </div>
      </template>
    </VTable>
  </div>
  <VModal
    v-model="isOpen"
    title="Remove user"
    btn-title="Remove user"
    btn-variant="dangerous"
    :loader="mainLoader"
    @submit="deleteUser"
    @close="closeModal"
  >
    <template #main>
      <h4 class="font-bold">
        Are you sure you want to remove <span>"{{ targetUserName }}"</span> user?
      </h4>
      <p class="text-sm">
        This action can’t be undone
      </p>
    </template>
  </VModal>
</template>
