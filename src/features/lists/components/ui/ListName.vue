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
      :class="['flex rounded-full', !listId ? 'w-2 h-2' : 'w-[10px] h-[10px]']"
      :style="{ backgroundColor: hexColor }"
    />
    <VButton
      v-if="listId"
      :text="title"
      variant="ghost"
      size="md"
      class="text-center hover:opacity-50 text-txtPrimary"
      @click="openList"
    />
    <span
      v-else
      class="text-bodyEmphasis text-txtPrimary"
    >
      {{ title }}
    </span>
  </h3>
</template>

