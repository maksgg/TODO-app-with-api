<script setup lang="ts">
import { List } from "@/features/lists/types/index";

const { item } = defineProps<{ item: any | List }>();

</script>

<template>
  <div
    class="flex-1 border-t pt-2"
  >
    <div class="flex justify-between">
      <slot name="header">
        <h3>
          {{ item.taskTitle }}
        </h3>
        <span>
          {{ item.status }}
        </span>
      </slot>
    </div>
    <div class="flex gap-4">
      <h4>{{ item.listTitle }}</h4>
      <span>{{ item.priority }}</span>
    </div>
    <div class="flex gap-2">
      <span
        v-for="(tag, index) in item.tags"
        :key="index"
      >
        {{ tag }}
      </span>
    </div>
  </div>
</template>
