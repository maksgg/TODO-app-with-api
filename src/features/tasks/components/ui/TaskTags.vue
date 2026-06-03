<script setup lang="ts">
import { VButton } from "@/shared/ui/index";

type TagsProps = {
  tags?: string[];
  taskId?: string;
  withDividers?: boolean;
  loader?: boolean;
  variant?: "modal" | "table";
  action?: boolean;
};

const {
  tags = [],
  taskId,
  withDividers = false,
  loader = false,
  variant="modal",
  action = false,
} = defineProps<TagsProps>();

const emit = defineEmits<{ "removeTag": [index: number, id: string] }>();

const removeTag = (index: number, id: string) => emit("removeTag", index, id);

const styleVariant: Record<TagsProps["variant"], string> ={
  modal: `text-ui-caption bg-border-default rounded-md px-2 py-1`,
  table: `text-body-m bg-transparent`,
};
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <div
      v-for="(tag, index) in tags"
      :key="index"
      :class="[
        'flex justify-between items-center gap-4 text-secondary',
        styleVariant[variant],
      ]"
    >
      <span
        v-if="withDividers &&index !== 0"
        class="w-1 h-1 rounded-full bg-secondary"
      />
      <span>{{ tag }}</span>
      <VButton
        v-if="action"
        icon="x"
        variant="ghost"
        icon-size="sm"
        :loader="loader"
        :show-text="false"
        @click="removeTag(index, taskId)"
      />
    </div>
  </div>
</template>
