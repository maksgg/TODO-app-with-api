<script setup lang="ts">
import "@vuepic/vue-datepicker/dist/main.css";
import { VueDatePicker } from "@vuepic/vue-datepicker";
import { computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";

import type { ModalFields, Task } from "../types";
import TaskTags from "./ui/TaskTags.vue";

import useDatePickerLocale from "@/shared/composables/useDatePickerLocale";
import VInput from "@/shared/ui/common/VInput.vue";
import VMultiselect from "@/shared/ui/common/VMultiselect.vue";

const { targetTask = null } = defineProps<{ targetTask: Partial<Task> | null; }>();

const modal = defineModel<ModalFields>();
const { t, locale } = useI18n();
const { dayNames, monthNames } = useDatePickerLocale();
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

const prioritySelect = computed(() =>({
  label: t("tasks.modalPriority.priority"),
  options: [
    { name: t("tasks.modalPriority.high"), value: "high" },
    { name: t("tasks.modalPriority.medium"), value: "medium" },
    { name: t("tasks.modalPriority.low"), value: "low" },
  ],
}));
watch(
  () => tagsState.value.list,
  (newList) => {
    const hasDuplicates = new Set(newList).size !== newList.length;
    if (hasDuplicates) {
      toast.error(t("tasks.toasts.duplicate_tags_are_not_allowed"));

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
      :label="$t('tasks.modal.task_name')"
      :placeholder="$t('tasks.modal.enter_task_name')"
    />
    <VMultiselect
      v-model:model="modal.priority"
      :label="prioritySelect.label"
      :options="prioritySelect.options"
      track-by="name"
      class="max-w-[50%]"
    />
    <div class="flex items-center gap-4 max-w-[70%]">
      <span class="text-uiLabel text-secondary whitespace-nowrap">{{ $t("tasks.modal.due") }}</span>
      <VueDatePicker
        v-model="modal.deadline"
        :enable-time-picker="false"
        :day-names="dayNames"
        :format-locale="locale"
        :month-picker="false"
        auto-apply
        format="dd.MM.yyyy"
        :placeholder="$t('tasks.modal.pick_date')"
      >
        <template #month-overlay-value="{ value }">
          {{ monthNames[value] }}
        </template>
      </VueDatePicker>
    </div>
    <VInput
      v-model="modal.tags"
      :label="$t('tasks.modal.tags')"
      :disabled="tagsState.isLimitReached"
      :placeholder="$t('tasks.modal.frontend,_Backend,_Vue')"
      :support-text="tagsState.isLimitReached ?
        $t('tasks.modal.you_have_exceeded_the_limit') :
        $t('tasks.modal.you_can_add_up_to_6_tags')"
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
  --dp-primary-color: var(--color-primary);
  --dp-primary-text-color: #ffffff;
  --dp-background-color: var(--color-secondaryBg);
  --dp-text-color: var(--color-txtPrimary);
  --dp-hover-color: var(--color-primaryBg);
  --dp-border-color: var(--color-borderDefault);
  --dp-border-color-hover: var(--color-borderHover);
}

/* Інпут */
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
  @apply rounded-r-xl border-borderDefault shadow-selectShadow;
}

:deep(.dp__calendar_header_item), :deep(.dp__cell_inner) {
  @apply text-uiCaption;
}

:deep(.dp__month_year_select) {
  @apply rounded-2xl text-uiLabel;
}

:deep(.dp__cell_inner:hover) {
  @apply bg-primaryBg text-primary;
}

:deep(.dp__month_year_select:hover) {
  @apply bg-primaryBg text-primary;
}

:deep(.dp__inner_nav:hover) {
  @apply bg-primaryBg text-primary;
}
/* Іконка годинника */
:deep(.dp--tp-wrap) {
  @apply hidden;
}
/* Місяці */
:deep(.dp__overlay_cell.dp__overlay_cell_pad) {
 @apply hover:text-primary
}
</style>
