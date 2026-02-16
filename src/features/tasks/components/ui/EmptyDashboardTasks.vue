<script setup lang="ts">
import { ModalType } from "@/shared/types";
import VButton from "@/shared/ui/common/VButton.vue";

const { item } = defineProps<{
  item: {
    title: string;
    emptySubtitle: string;
    emptyText: string;
    btnTitle: string;
    addBtnText: string;
  };
}>();

const emit = defineEmits<{ "addWeeklyGoals": [ModalType] }>();
const addWeeklyGoals = () => {
  console.log("Button clicked, emitting addWeeklyGoals");
  emit("addWeeklyGoals", "add");
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex justify-between">
      <div class="flex flex-col gap-2">
        <h3 class="text-headPrimary text-txtPrimary">
          {{ item.title }}
        </h3>
        <span class="text-bodyM text-secondary">
          {{ item.emptySubtitle }}
        </span>
      </div>
    </div>
    <div class="flex flex-col gap-7 self-center">
      <p class="text-bodyIntro text-muted">
        {{ item.emptyText }}
      </p>
      <VButton
        v-if="item.addBtnText === 'Add weekly goal'"
        :text="item.addBtnText"
        variant="ghost"
        icon="plus"
        class="m-auto px-5 py-2 text-uiBtn text-primary gap-2 hover:scale-110"
        @click="addWeeklyGoals"
      />
      <VButton
        v-else
        :text="item.addBtnText"
        variant="ghost"
        icon="plus"
        class="m-auto px-5 py-2 text-uiBtn text-primary gap-2 hover:scale-110"
        to="/list"
      />
    </div>
  </div>
</template>

