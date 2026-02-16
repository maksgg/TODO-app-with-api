<script setup lang="ts">
import { useRoute } from "vue-router";

import ListsFeature from "@/features/lists/ListsFeature.vue";
import TasksListFeature from "@/features/tasks/TasksListFeature.vue";

const route = useRoute();
</script>

<template>
  <TasksListFeature v-if="route.query.id" />
  <ListsFeature v-else />
</template>

