<script setup lang="ts">
import { refDebounced } from "@vueuse/core";
import { onUnmounted, onMounted, computed, ref, watch, toRef } from "vue";
import { useI18n } from "vue-i18n";

import ListCardsWrapper from "./components/ListCardsWrapper.vue";
import { useListsStore } from "./store/useListsStore";

import { useAuthStore } from "@/shared/stores/useAuthStore";
import { VEmptyState, VLoader, VToggleTabs, VToolbar } from "@/shared/ui/index";
import { extractFilterValues, getMappedFilters } from "@/shared/utils/toolbarHelper";

const { t } = useI18n();
const filterConfig = computed(() => [
  {
    key: "sort",
    label: t("lists.toolbar.sort_by"),
    options: [
      { name: t("lists.toolbar.recently_created"), value: "createdAt:desc" },
      { name: t("lists.toolbar.recently_updated"), value: "updatedAt:desc" },
      { name: t("lists.toolbar.A_->_Z"), value: "title:asc" },
      { name: t("lists.toolbar.Z_->_A"), value: "title:desc" },
    ],
  },
]);
const filters = ref({
  search: "",
  sort: "createdAt:desc",
});
const debounceSearch = refDebounced<string>(toRef(filters.value, "search"), 700);

const toolbarSelect = computed({
  get: () => getMappedFilters(filterConfig.value, filters.value),
  set: (newValues) => {
    const updated = extractFilterValues(newValues);
    Object.assign(filters.value, updated);
  },
});

const listStore = useListsStore();
const authStore = useAuthStore();

const listTabs = computed(() => [
  { id: "myLists", label: t("lists.tabs.my_lists") },
  { id: "usersLists", label: t("lists.tabs.users_lists") },
]);

const requestParams = computed(() => {
  const rawSort = filters.value.sort || "createdAt:desc";
  const [field, direction] = rawSort.split(":");

  return {
    q: listStore.currentTab === "myLists" ? filters.value.search : undefined,
    sort: field,
    order: direction,
    isOwn: listStore.currentTab === "myLists" ? true : undefined,
  };
});
const hasLists = computed(() => !!listStore.allLists?.data?.length);

watch(
  () => [
    debounceSearch.value,
    filters.value.sort,
    listStore.currentTab,
  ],
  () => listStore.getAllLists({ params: requestParams.value }),
  { deep: true },
);
onMounted(() => listStore.getAllLists({ params: requestParams.value }));
onUnmounted(() => listStore.currentTab = "myLists");
</script>

<template>
  <div class="flex flex-col flex-1 gap-6">
    <VToggleTabs
      v-if="authStore.userData?.isAdmin || authStore.isAllowed('read:all-lists')"
      v-model="listStore.currentTab"
      :options="listTabs"
    />
    <VToolbar
      v-model:search="filters.search"
      v-model:filters="toolbarSelect"
      :is-searchable="listStore.currentTab === 'myLists'"
      :filter-configs="filterConfig"
      :disabled="listStore.allListsLoader || !authStore.isAllowed('read:list')"
      :placeholder="$t('lists.toolbar.search')"
      select-width="md"
    />
    <div class="relative w-full h-full">
      <VLoader
        v-if="listStore.allListsLoader"
        size="lg"
      />
      <VEmptyState
        v-if="!listStore.allListsLoader && !hasLists"
        :title="$t('lists.emptyState.no_lists_yet')"
        :sub-title="$t('lists.emptyState.create_your_first_list_to_start_organizing_your_tasks')"
      />
      <ListCardsWrapper
        v-show="!listStore.allListsLoader && hasLists"
        v-model:filters="filters"
        :params="requestParams"
      />
    </div>
  </div>
</template>
