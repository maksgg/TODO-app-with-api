<script setup lang="ts">
import { onMounted, watch } from "vue";

import ListCard from "./components/ListCard.vue";
import ListFormModals from "./components/ListFormModals.vue";
import { userListsStore } from "./store/useListsStore";

import { FilterConfig } from "@/features/lists/types";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import VButton from "@/shared/ui/common/VButton.vue";
import VHeader from "@/shared/ui/common/VHeader.vue";
import VLoader from "@/shared/ui/common/VLoader.vue";
import VTabs from "@/shared/ui/common/VTabs.vue";
import VToolbar from "@/shared/ui/common/VToolbar.vue";

const listStore = userListsStore();
const authStore = useAuthStore();

const listsTabs = [
  { id: "myLists", label: "My lists" },
  { id: "userLists", label: "Users lists" },
];

const myFiltersConfig: FilterConfig[] = [
  {
    key: "sort",
    label: "Sort by",
    options: [
      { name: "Recently created", value: "createdAt:desc" },
      { name: "Recently updated", value: "updatedAt:desc" },
      { name: "A -> Z", value: "title:asc" },
      { name: "Z -> A", value: "title:desc" },
    ],
  },
];

watch(
  () => listStore.payloadParams,
  () => listStore.getAllLists(),
  { deep: true },
);
onMounted(() => {
  listStore.allLists = null;
  listStore.getAllLists();
});
</script>

<template>
  <VHeader title="Manage all your task groups in one place">
    <template #actions>
      <VButton
        text="Create new list"
        icon="plus"
        @click="listStore.openModal('create')"
      />
    </template>
  </VHeader>
  <div class="flex flex-col gap-6 px-12 py-6">
    <VTabs
      v-if="authStore.userData.isAdmin"
      :tabs="listsTabs"
    />
    <VToolbar
      v-model:search="listStore.payloadParams.q"
      v-model:filters="listStore.payloadParams"
      :filter-configs="myFiltersConfig"
    />
    <div class="relative w-full">
      <div
        v-if="listStore.allListsLoader"
        class="absolute inset-0 z-[10] flex items-center justify-center
      bg-white/60 backdrop-blur-[2px] transition-all duration-300"
      >
        <VLoader size="lg" />
      </div>
      <div
        v-else-if="listStore.hasLists"
        class="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6"
      >
        <ListCard
          v-for="list in listStore.allLists?.data"
          :key="list._id"
          :list="list"
        />
      </div>
      <div
        v-else-if="listStore.emptyPageState"
        class="flex flex-col gap-2 justify-center items-center w-full"
      >
        <h4 class="text-headingCard text-txtPrimary">
          No lists yet
        </h4>
        <span class="text-bodyM text-secondary">
          Create your first list to start organizing your tasks
        </span>
      </div>
    </div>
  </div>
  <ListFormModals />
</template>
