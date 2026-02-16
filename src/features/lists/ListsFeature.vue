<script setup lang="ts">
import { debouncedRef } from "@vueuse/core";
import { onUnmounted, onMounted, computed, ref, watch } from "vue";

import ListCardsWrapper from "./components/ListCardsWrapper.vue";
import { useListsStore } from "./store/useListsStore";

import { usePermissions } from "@/shared/composables/usePermissions";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import { FilterConfig } from "@/shared/types";
import VEmptyState from "@/shared/ui/common/VEmptyState.vue";
import VLoader from "@/shared/ui/common/VLoader.vue";
import VToggleTabs from "@/shared/ui/common/VToggleTabs.vue";
import VToolbar from "@/shared/ui/common/VToolbar.vue";

const currentTab = ref<"myLists" | "usersLists">("myLists");
const searchQuery = ref("");
const debounceSearch = debouncedRef<string>(searchQuery, 700);
const toolBarPayload = ref({
  sort: { name: "Recently created", value: "createdAt:desc" },
  order: "",
});
const { isAllowed } = usePermissions();
const listStore = useListsStore();
const authStore = useAuthStore();

const listTabs = [
  { id: "myLists", label: "My lists" },
  { id: "usersLists", label: "Users lists" },
];
const filterConfig: FilterConfig = [
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

const requestParams = computed(() => {
  const rawSort = toolBarPayload.value.sort?.value || "createdAt:desc";
  const [field, direction] = rawSort.split(":");

  return {
    q: searchQuery.value,
    sort: field,
    order: direction,
    isOwn: currentTab.value === "myLists" ? true : undefined,
  };
});
const hasLists = computed(() => !!listStore.allLists?.data?.length);

watch(
  () => [
    debounceSearch.value,
    toolBarPayload.value,
    currentTab.value,
  ],
  () => listStore.getAllLists({ params: requestParams.value }),
  { deep: true },
);

onMounted(() => listStore.getAllLists({ params: requestParams.value }));
onUnmounted(() => currentTab.value = "myLists");
</script>

<template>
  <div class="flex flex-col flex-1 gap-6">
    <VToggleTabs
      v-if="authStore.userData?.isAdmin || isAllowed('read:all-lists')"
      v-model="currentTab"
      :options="listTabs"
    />
    <VToolbar
      v-model:search="searchQuery"
      v-model:filters="toolBarPayload"
      :filter-configs="filterConfig"
      :disabled="listStore.allListsLoader || !isAllowed('read:list')"
      select-width="md"
    />
    <div class="relative w-full h-full">
      <VLoader
        v-if="listStore.allListsLoader"
        size="lg"
      />
      <VEmptyState
        v-if="!listStore.allListsLoader && !hasLists"
        title="No lists yet"
        sub-title="Create your first list to start organizing your tasks"
      />
      <ListCardsWrapper
        v-show="!listStore.allListsLoader && hasLists"
        :current-tab="currentTab"
        :params="requestParams"
      />
    </div>
  </div>
</template>
