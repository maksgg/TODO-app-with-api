<script setup lang="ts">
import { firstLetterUp } from "@/shared/utils";

const { priority } = defineProps<{ priority: string }>();

const priorityStyles: Record<string, { dot: string, text: string }> = {
  high: {
    dot: "bg-dangerous",
    text: "text-dangerous",
  },
  medium: {
    dot: "bg-warning",
    text: "text-warning",
  },
  low: {
    dot: "bg-success",
    text: "text-success",
  },
};
</script>

<template>
  <div class="flex items-center gap-2">
    <span
      class="w-1 h-1"
      :class="priorityStyles[priority]?.dot"
    />
    <span
      :class="['text-bodyM',priorityStyles[priority]?.text]"
    >
      {{ firstLetterUp(priority) }}
    </span>
  </div>
</template>

