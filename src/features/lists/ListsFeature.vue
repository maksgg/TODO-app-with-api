<script setup lang="ts">
import { debouncedRef } from "@vueuse/core";
import { onUnmounted, onMounted, computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import ListCardsWrapper from "./components/ListCardsWrapper.vue";
import { useListsStore } from "./store/useListsStore";

import { useAuthStore } from "@/shared/stores/useAuthStore";
import VEmptyState from "@/shared/ui/common/VEmptyState.vue";
import VLoader from "@/shared/ui/common/VLoader.vue";
import VToggleTabs from "@/shared/ui/common/VToggleTabs.vue";
import VToolbar from "@/shared/ui/common/VToolbar.vue";

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

const currentTab = ref<"myLists" | "usersLists">("myLists");
const searchQuery = ref("");
const debounceSearch = debouncedRef<string>(searchQuery, 700);
const toolBarPayload = computed({
  get: () => ({ sort: filterConfig.value[0].options[0] }),
  set: (option) => option,
});
const listStore = useListsStore();
const authStore = useAuthStore();

const listTabs = computed(() => [
  { id: "myLists", label: t("lists.tabs.my_lists") },
  { id: "usersLists", label: t("lists.tabs.users_lists") },
]);

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
      v-if="authStore.userData?.isAdmin || authStore.isAllowed('read:all-lists')"
      v-model="currentTab"
      :options="listTabs"
    />
    <VToolbar
      v-model:search="searchQuery"
      v-model:filters="toolBarPayload"
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
        :current-tab="currentTab"
        :params="requestParams"
      />
    </div>
  </div>
</template>
