<script setup lang="ts">
import { computed } from "vue";

const { total, mode } = defineProps<{
  mode: "edit" | "add" | null;
  total: number | undefined;
}>();

const title = computed(() => {
  if (mode === "edit") {
    return "Edit weekly focus goals";
  }
  return "Add weekly goals";
});
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <div class="flex justify-between gap-2">
      <h3 class="text-modalHead text-txtPrimary">
        {{ title }}
      </h3>
      <span
        v-if="total"
        class="text-bodyM text-muted"
      >
        {{ total }}/3 selected
      </span>
    </div>
    <span class="text-uiCaption text-secondary">
      Choose up to 3 tasks to focus on this week
    </span>
  </div>
</template>

