<script setup lang="ts">
import type { TasksDeadlinesResponse } from "../types";
import DashboardTaskItemSkeleton from "./skeletons/DashboardTaskItemSkeleton.vue";
import DashboardTaskItem from "./ui/DashboardTaskItem.vue";

import { ModalType } from "@/shared/types";
import VButton from "@/shared/ui/common/VButton.vue";
import VContainer from "@/shared/ui/common/VContainer.vue";
import VSkeleton from "@/shared/ui/common/VSkeleton.vue";

const { item, loader } = defineProps<{
  loader: boolean;
  localLoader?: boolean;
  item: {
    variant?: "weekly" | "deadline",
    title: string;
    subtitle: string;
    btnTitle: string;
    fetchedData: TasksDeadlinesResponse["data"] | null;
    emptySubtitle: string;
    emptyText: string;
    addBtnText: string;
  };
}>();
const emit = defineEmits<{ "editWeeklyGoals": [ModalType], "removeWeeklyGoal": [id: string] }>();

const openEditModal = () => emit("editWeeklyGoals", "edit");
const removeWeeklyGoal = (id: string) => emit("removeWeeklyGoal", id);
</script>

<template>
  <div class="flex justify-between items-center mb-4">
    <div>
      <h3 class="text-headPrimary text-txtPrimary">
        {{ item.title }}
      </h3>
      <VSkeleton
        v-if="loader"
        width="250"
        height="20"
        class="mt-2"
      />
      <span
        v-else
        class="text-bodyM text-secondary"
      >
        {{ item.subtitle }}
      </span>
    </div>
    <VButton
      :text="item.btnTitle"
      variant="ghost"
      class="self-start text-uiBtn text-primary hover:scale-110"
      :to="item?.btnTitle !== 'Edit' ? '/list' : undefined"
      @click="item?.btnTitle === 'Edit' ? openEditModal() : null"
    />
  </div>
  <div class="flex flex-col gap-2">
    <template v-if="loader">
      <template v-if="item.variant === 'deadline'">
        <DashboardTaskItemSkeleton
          v-for="el in 5"
          :key="el"
        />
      </template>
      <div
        v-else-if="item.variant === 'weekly'"
        class="grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-6"
      >
        <VContainer
          v-for="el in 3"
          :key="el"
          variant="weekly"
        >
          <DashboardTaskItemSkeleton />
        </VContainer>
      </div>
    </template>
    <template v-else>
      <template v-if="item.variant === 'deadline'">
        <DashboardTaskItem
          v-for="el in item.fetchedData"
          :key="el.id"
          :item="el"
        />
      </template>
      <div
        v-if="item.variant === 'weekly'"
        class="grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-6"
      >
        <VContainer
          v-for="el in item.fetchedData"
          :key="el.id"
          variant="weekly"
        >
          <DashboardTaskItem
            :item="el"
            class="border-none"
          >
            <div class="flex flex-col gap-4">
              <VButton
                icon="x"
                variant="ghost"
                class="ml-auto text-txtPrimary hover:text-dangerous active:scale-75"
                @click="removeWeeklyGoal(el.id)"
              />
              <span class="text-bodyL text-txtPrimary">{{ el.title }}</span>
            </div>
          </DashboardTaskItem>
        </VContainer>
      </div>
    </template>
  </div>
</template>
