<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import { userListsStore } from "@/features/lists/store/useListsStore";
import TasksListFeature from "@/features/tasks/TasksListFeature.vue";

const route = useRoute();

const listStore = userListsStore();

const listName = computed(() => listStore.allLists?.data?.find((el) => el._id === route.params.id));
</script>

<template>
  <TasksListFeature
    :list-name="listName?.title || ''"
  />
</template>

