<script setup lang="ts">
import VButton from "@/shared/ui/common/VButton.vue";

const { hexColor, title, listId } = defineProps<{
  hexColor?: string | null | undefined;
  title: string | undefined;
  listId?: string;
}>();

const emit = defineEmits<{ "openList": [id: string] }>();
const openList = () => emit("openList", listId);
</script>

<template>
  <h3 class="flex items-center gap-2 text-heading-card min-w-0 overflow-hidden">
    <span
      class="flex rounded-full w-3 h-3"
      :style="{ backgroundColor: hexColor }"
    />
    <VButton
      v-if="listId"
      :text="title"
      variant="ghost"
      class="text-center hover:text-active-primary text-txt-primary cursor-pointer"
      @click="openList"
    />
    <span
      v-else
      class="text-ui-head capitalize text-txt-primary"
    >
      {{ title }}
    </span>
  </h3>
</template>
