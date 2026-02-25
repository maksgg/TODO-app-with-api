<script setup lang="ts">
import { ref } from "vue";

import WeeklyGoalsModalHead from "./WeeklyGoalsModalHead.vue";

import ListName from "@/features/lists/components/ui/ListName.vue";
import type { List } from "@/features/lists/types";
import VButton from "@/shared/ui/common/VButton.vue";
import VCheckbox from "@/shared/ui/common/VCheckbox.vue";
import VExpandableSection from "@/shared/ui/common/VExpandableSection.vue";
import VModal from "@/shared/ui/common/VModal.vue";

const { lists, selectedIds, mode, loading } = defineProps<{
  lists: List[] | undefined;
  selectedIds: string[];
  mode: "edit" | "add";
  loading: boolean;
}>();

const emit = defineEmits<{
  "toggle": [id: string];
  "submit": [void];
  "close": [void];
}>();

const toggleTask = (id: string) => emit("toggle", id);
const close = () => emit("close");
const submit = () => emit("submit");
const expandedList = ref<string | null>(null);
</script>

<template>
  <VModal id="addAndEditWeeklyGoals">
    <template #header>
      <WeeklyGoalsModalHead
        :total="selectedIds.length"
        :mode="mode"
      />
    </template>
    <div class="h-[25rem] overflow-auto custom-scrollbar">
      <VExpandableSection
        v-for="list in lists"
        :key="list._id"
        v-model="expandedList"
        :section-id="list._id"
        class="gap-4"
      >
        <template #title="{ isExpanded }">
          <div class="flex gap-2 items-center cursor-pointer">
            <VButton
              icon="chevronUp"
              icon-size="md"
              variant="ghost"
              :show-text="false"
              :class="[
                'transition-transform text-secondary',
                isExpanded ? 'rotate-90' : 'rotate-180'
              ]"
            />
            <ListName
              :title="list.title"
              :hex-color="list.hexColor"
            />
          </div>
        </template>
        <div class="flex flex-col gap-4 pl-8 pb-2">
          <VCheckbox
            v-for="task in list.tasks"
            :id="task.id"
            :key="task.id"
            :text="task.title"
            :model-value="selectedIds.includes(task.id)"
            @update:model-value="toggleTask(task.id)"
          />
          <div class="h-[1px] rounded bg-primary w-[calc(100%-20px)]" />
        </div>
      </VExpandableSection>
    </div>
    <template #footer>
      <div class="flex gap-5 w-full justify-end">
        <VButton
          text="Cancel"
          class="!bg-transparent text-primary"
          @click="close"
        />
        <VButton
          :text="mode === 'edit' ? 'Save changes' : 'Add goals'"
          variant="primary"
          :loader="loading"
          :disabled="loading"
          @click="submit"
        />
      </div>
    </template>
  </VModal>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-primary);
  border-radius: 10px;
}
 </style>
