<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";
import { useRouter } from "vue-router";

import useUsersRequests from "./api/useUsersRequests";

import { TableParams, ToolBar } from "@/shared/types";
import VAvatar from "@/shared/ui/common/VAvatar.vue";
import VButton from "@/shared/ui/common/VButton.vue";
import VDropDown from "@/shared/ui/common/VDropDown.vue";
import VModal from "@/shared/ui/common/VModal.vue";
import VMultiselect from "@/shared/ui/common/VMultiselect.vue";
import VTable from "@/shared/ui/common/VTable.vue";
import { formatDate } from "@/shared/utils/index";

const isOpen = ref(false);
const userId = ref<string | null>(null);
const router = useRouter();
const pagination = ref({
  limit: 20,
  hasMore: false,
});
const toolBar = ref<ToolBar>({
  searchField: "",
  role: "all",
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

  if (toolBar.value.role !== "all") {
    queryParams.role = toolBar.value.role;
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
  { name: "All", value: "all" },
  { name: "User", value: "user" },
  { name: "Admin", value: "admin" },
];
const selectedRole = computed({
  get: () => toolbarConfig.find(el => el.value === toolBar.value.role) || toolbarConfig[0],
  set: (val) => toolBar.value.role = val.value as ToolBar["role"],
});
const tableActions = [
  { value: "user", label: "User Profile" },
  { value: "remove", label: "Remove user" },
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
      role: newValue.role,
    });
  },
  { deep: true },
);

onMounted(() => loadData());
</script>

<template>
  <div class="flex flex-col flex-1 h-screen px-12 pt-6 pb-2 ">
    <h1 class="text-4xl font-semibold">
      User Management
    </h1>
    <VTable
      v-model="toolBar.searchField"
      :header="userHeader"
      :rows="usersData?.data"
      :loader="mainLoader"
      :searchable="true"
      :pagination="pagination"
      @request="requestSortTable"
    >
      <template #toolBar>
        <VMultiselect
          v-model:model="selectedRole"
          :options="toolbarConfig"
          track-by="value"
        />
      </template>
      <template #col-member="{ row }">
        <div class="flex items-center gap-2">
          <VAvatar
            :name="row.name"
            class="shrink-0"
          />
          <div class="flex flex-col gap-1 justify-center min-w-0">
            <span class="truncate text-sm">{{ row.name }}</span>
            <span class="truncate text-[12px]">{{ row.email }}</span>
          </div>
        </div>
      </template>
      <template #col-actions="{ row }">
        <div class="flex flex-wrap justify-end gap-5 z-50">
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
    :is-close-btn="false"
  >
    <template #main>
      <h4 class="font-bold">
        Are you sure you want to remove this user?
      </h4>
      <p class="text-sm">
        This action can’t be undone
      </p>
    </template>
    <template #footer>
      <div class="flex justify-center gap-5 mt-5">
        <VButton
          text="Cancel"
          @click="closeModal"
        />
        <VButton
          text="Remove user"
          variant="dangerous"
          :loader="mainLoader"
          @click="deleteUser"
        />
      </div>
    </template>
  </VModal>
</template>
