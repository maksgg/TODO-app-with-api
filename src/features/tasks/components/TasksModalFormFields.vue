<script setup lang="ts">
import "@vuepic/vue-datepicker/dist/main.css";
import { VueDatePicker } from "@vuepic/vue-datepicker";
import { computed, watch } from "vue";
import { toast } from "vue-sonner";

import { ModalFields, Task } from "../types";
import TaskTags from "./ui/TaskTags.vue";

import VInput from "@/shared/ui/common/VInput.vue";
import VMultiselect from "@/shared/ui/common/VMultiselect.vue";

const { targetTask = null } = defineProps<{ targetTask: Partial<Task> | null; }>();

const modal = defineModel<ModalFields>();
const tagsState = computed(() => {
  const rawValue = modal.value.tags || "";
  const completedTags = rawValue.match(/[^ ,;]+(?=[ ,;])/g) || [];

  const maxTags = 6;
  return {
    list: completedTags.slice(0, maxTags),
    isLimitReached: completedTags.length >= maxTags,
  };
});

const removeTag = (index: number) => {
  const list = [...tagsState.value.list];
  list.splice(index, 1);

  const currentMatch = modal.value.tags.match(/[^ ,;]+$/);
  const currentTyping = currentMatch ? currentMatch[0] : "";

  modal.value.tags = list.length
    ? list.join(", ") + ", " + currentTyping
    : currentTyping;
};

const prioritySelect = {
  label: "Priority",
  options: [
    { name: "High", value: "high" },
    { name: "Medium", value: "medium" },
    { name: "Low", value: "low" },
  ],
};
watch(
  () => tagsState.value.list,
  (newList) => {
    const hasDuplicates = new Set(newList).size !== newList.length;
    if (hasDuplicates) {
      toast.error("Duplicate tags are not allowed");

      const uniqueTags = Array.from(new Set(newList));
      const currentTyping = modal.value.tags.match(/[^ ,;]*$/)?.[0] || "";

      modal.value.tags = uniqueTags.length
        ? uniqueTags.join(", ") + ", " + currentTyping
        : currentTyping;
    }
  },
  { deep: true },
);
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <VInput
      v-model="modal.title"
      label="Task name"
      placeholder="Enter task name"
    />
    <VMultiselect
      v-model:model="modal.priority"
      :label="prioritySelect.label"
      :options="prioritySelect.options"
      track-by="name"
      class="max-w-[50%]"
    />
    <div class="flex items-center gap-4 max-w-[70%]">
      <span class="text-uiLabel text-secondary">Due</span>
      <VueDatePicker
        v-model="modal.deadline"
        :enable-time-picker="false"
        :month-picker="false"
        auto-apply
        format="dd.MM.yyyy"
        placeholder="Pick date"
      />
    </div>
    <VInput
      v-model="modal.tags"
      label="Tags"
      :disabled="tagsState.isLimitReached"
      placeholder="Frontend, Backend, Vue..."
      :support-text="tagsState.isLimitReached ?
        `You've exceeded the limit` :
        'You can add up to 6 tags'"
    />
    <TaskTags
      v-if="tagsState.list.length > 0"
      :id="targetTask?.id"
      :tags="tagsState.list"
      action
      @remove-tag="removeTag"
    />
  </div>
</template>

<style scoped>
:deep(.dp__theme_light) {
  /* Головні кольори */
  --dp-primary-color: var(--color-primary);
  --dp-primary-text-color: #ffffff;

  /* Фони та текст */
  --dp-background-color: var(--color-secondaryBg);
  --dp-text-color: var(--color-txtPrimary);
  --dp-hover-color: var(--color-primaryBg);

  /* Бордери */
  --dp-border-color: var(--color-borderDefault);
  --dp-border-color-hover: var(--color-borderHover);
}

/* Інпут (має бути як твій VInput / Multiselect) */
:deep(.dp-custom-input) {
  @apply border-2 border-borderDefault transition-all py-2 text-bodyM text-muted shadow-activeTab;
}

:deep(.dp__input) {
  @apply border-2 rounded-lg;
}

:deep(.dp__input_icon) {
  @apply text-txtPrimary;
}

:deep(.dp--clear-btn) {
  @apply hidden;
}

:deep(.dp-custom-input:hover) {
  @apply  border-borderHover;
}

:deep(.dp__input_focus) {
  @apply border-primary;
}

/* Випадаюче меню (Календар) */
:deep(.dp__menu) {
  /* Використовуємо твій dropShadow primary та стандартну тінь для об'єму */
  @apply rounded-r-xl border-borderDefault shadow-selectShadow;
}

/* Стилізація шрифтів під твій конфіг */
:deep(.dp__calendar_header_item), :deep(.dp__cell_inner) {
  @apply text-uiCaption;
}

:deep(.dp__month_year_select) {
  @apply rounded-2xl text-uiLabel; /* 14px */
}

:deep(.dp__cell_inner:hover) {
  @apply bg-primaryBg text-primary;
}

/* Ховер на вибір місяця та року */
:deep(.dp__month_year_select:hover) {
  @apply bg-primaryBg text-primary;
}

/* Якщо ти хочемо також змінити ховер на стрілках вліво/вправо */
:deep(.dp__inner_nav:hover) {
  @apply bg-primaryBg text-primary;
}
/* Іконка годинника */
:deep(.dp--tp-wrap) {
  @apply hidden;
}
</style>
