<script setup lang="ts">
import { userListsStore } from "../store/useListsStore";
import { List } from "../types";

import VButton from "@/shared/ui/common/VButton.vue";
import VDropDown from "@/shared/ui/common/VDropDown.vue";

const listStore = userListsStore();

const { list } = defineProps<{ list: List; }>();
</script>

<template>
  <div
    class="flex flex-col gap-4 border border-listCardBorder p-6 pr-4 pb-9 min-w-[260px] rounded-xl"
  >
    <div class="flex justify-between items-center gap-2">
      <h3 class="flex items-center gap-2 text-headingCard min-w-0 overflow-hidden">
        <span
          class="flex w-[10px] h-[10px] text-txtPrimary rounded-full"
          :style="{ backgroundColor: list.hexColor }"
        />
        <VButton
          :text="list.title"
          variant="ghost"
          size="md"
          :to="`/list/${list._id}`"
          class="text-center hover:opacity-50"
        />
      </h3>
      <slot name="actions">
        <VDropDown
          :id="list._id"
          :items="listStore.listsActions"
          trigger="icon"
          placement="bottomRight"
          class="text-primary"
          @action="listStore.actions"
        />
      </slot>
    </div>
    <div class="flex items-start gap-4 text-bodyL">
      <span class="text-secondary">{{ list.totalTasks }} tasks</span>
      <span class="text-muted">{{ list.completedTasks }} completed</span>
    </div>
  </div>
</template>

