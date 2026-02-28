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
  <h3 class="flex items-center gap-2 text-headingCard min-w-0 overflow-hidden">
    <span
      class="flex rounded-full w-3 h-3"
      :style="{ backgroundColor: hexColor }"
    />
    <VButton
      v-if="listId"
      :text="title"
      variant="ghost"
      class="text-center hover:text-activePrimary text-txtPrimary"
      @click="openList"
    />
    <span
      v-else
      class="text-uiHead capitalize text-txtPrimary"
    >
      {{ title }}
    </span>
  </h3>
</template>

