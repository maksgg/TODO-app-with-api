<script setup lang="ts">
import { VButton } from "@/shared/ui/index";

const { isExpanded } = defineProps<{
  isExpanded: boolean;
}>();

const emit = defineEmits<{ "is-expanded": [] }>();
const expandSidebar = () => emit("is-expanded");
</script>

<template>
  <div class="flex justify-between">
    <span
      v-if="isExpanded"
      class="text-body-emphasis bg-logo-gradient bg-clip-text text-transparent text-nowrap"
    >TASK MANAGER</span>
    <VButton
      :icon="isExpanded ? 'chevronLeft' : 'chevronRight'"
      variant="ghost"
      :is-open="isExpanded"
      class="ml-2.5 text-secondary"
      :show-text="false"
      @click="expandSidebar"
    />
  </div>
</template>
