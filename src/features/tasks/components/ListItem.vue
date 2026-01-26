<script setup lang="ts">
import { List } from "@/features/lists/types/index";

const { item } = defineProps<{ item: any | List }>();

</script>

<template>
  <div
    class="flex-1 border-t pt-2"
  >
    <div class="flex justify-between">
      <h3 class="text-bodyL">
        {{ item.taskTitle }}
      </h3>
      <span class="text-uiCaption">
        {{ item.status }}
      </span>
    </div>
    <div class="flex gap-4 text-uiCaption">
      <h4>{{ item.listTitle }}</h4>
      <span>{{ item.priority }}</span>
    </div>
    <div class="flex gap-2 text-uiCaption">
      <span
        v-for="(tag, index) in item.tags"
        :key="index"
      >
        {{ tag }}
      </span>
    </div>
  </div>
</template>
