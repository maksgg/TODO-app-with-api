<script setup lang="ts">
import { computed, toValue } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

import LanguageSelector from "@/features/i18n/components/LanguageSelector.vue";
import { useListsStore } from "@/features/lists/store/useListsStore";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import ThemeToggle from "@/features/theme/components/ThemeToggle.vue";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import VButton from "@/shared/ui/common/VButton.vue";
import VSkeleton from "@/shared/ui/common/VSkeleton.vue";

const authStore = useAuthStore();
const listsStore = useListsStore();
const tasksStore = useTasksStore();
const { t } = useI18n();
const route = useRoute();

const headerLoader = computed(() => tasksStore.loading || authStore.loading);
const header = computed(() => {
  if (listsStore.currentTab === "usersLists") {
    return { title: t("header.title.lists_overview") };
  }
  if (route.name === "Tasks" && route.params.id) {
    return { title: tasksStore.allTasks?.listInfo?.title, path: "/list" };
  }
  if (route.name === "Dashboard") {
    return { title: `${t("header.title.good_to_see_you_again")}, ${authStore.userData?.name}` };
  }
  if (route.meta.headerTitle) {
    return { title: toValue(route.meta.headerTitle) };
  }

  return { title: "" };
});
</script>

<template>
  <div
    v-show="header.title || headerLoader"
    class="flex justify-between items-center bg-secondary-bg
    header-container rounded-xl py-3 px-4 h-17.5"
  >
    <VSkeleton
      v-if="headerLoader && !tasksStore.targetTaskLoader"
      width="30%"
      height="30"
    />
    <div
      v-else
      class="flex items-center gap-2"
    >
      <VButton
        v-if="header.path"
        icon="chevronLeft"
        variant="ghost"
        :show-text="false"
        :to="header.path"
        class="text-secondary"
      />
      <h2 class="text-heading-card text-txt-primary truncate">
        {{ header?.title }}
      </h2>
    </div>
    <div
      class="flex gap-6"
    >
      <div id="header-action" />
      <ThemeToggle />
      <LanguageSelector variant="select" />
    </div>
  </div>
</template>

<style scoped>
.header-container {
  border: 2px solid transparent;
  background-image:
    linear-gradient(var(--color-secondary-bg), var(--color-secondary-bg)),
    linear-gradient(90deg, rgba(62, 13, 168, 1) 0%, rgba(95, 134, 239, 1) 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
</style>
