<script setup lang="ts">
import VButton from "@/shared/ui/common/VButton.vue";

const { isExpanded } = defineProps<{
  isExpanded: boolean;
}>();

const emit = defineEmits<{ "is-expanded": [] }>();
const expandSidebar = () => emit("is-expanded");
</script>

<template>
  <VButton
    :icon="isExpanded ? 'chevronLeft' : 'chevronRight'"
    variant="ghost"
    :is-open="isExpanded"
    class="self-end pr-1 text-secondary"
    :show-text="false"
    @click="expandSidebar"
  />
</template>

