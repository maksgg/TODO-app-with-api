<script setup lang="ts">
import type { ModalType } from "@/shared/types";
import VButton from "@/shared/ui/common/VButton.vue";

const { item } = defineProps<{
  item: {
    title: string;
    emptySubtitle: string;
    emptyText: string;
    btnTitle: string;
    addBtnText: string;
    btnKey?: string | undefined;
  };
}>();

const emit = defineEmits<{ "addWeeklyGoals": [ModalType] }>();
const addWeeklyGoals = () => emit("addWeeklyGoals", "edit");
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex justify-between">
      <div class="flex flex-col gap-2">
        <h3 class="text-head-primary text-txt-primary">
          {{ item.title }}
        </h3>
        <span class="text-body-m text-secondary">
          {{ item.emptySubtitle }}
        </span>
      </div>
    </div>
    <div class="flex flex-col gap-7 self-center">
      <p class="text-body-intro text-muted">
        {{ item.emptyText }}
      </p>
      <VButton
        v-if="item.btnKey === 'edit'"
        :text="item.addBtnText"
        variant="ghost"
        icon="plus"
        class="m-auto px-5 py-2 text-ui-btn text-primary gap-2 hover:scale-110"
        @click="addWeeklyGoals()"
      />
      <VButton
        v-else
        :text="item.addBtnText"
        variant="ghost"
        icon="plus"
        class="m-auto px-5 py-2 text-ui-btn text-primary gap-2 hover:scale-110"
        to="/list"
      />
    </div>
  </div>
</template>
