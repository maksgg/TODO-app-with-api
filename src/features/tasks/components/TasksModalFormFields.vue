<script setup lang="ts">
import "@vuepic/vue-datepicker/dist/main.css";
import { VueDatePicker } from "@vuepic/vue-datepicker";
import { computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";

import type { ModalFields, Task } from "../types";
import TaskTags from "./ui/TaskTags.vue";

import useDatePickerLocale from "@/shared/composables/useDatePickerLocale";
import { VInput, VMultiselect } from "@/shared/ui/index";

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
      <span class="text-ui-label text-secondary whitespace-nowrap">
        {{ $t("tasks.modal.due") }}
      </span>
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
@reference "../../../app/main.css";
:deep(.dp__theme_light) {
  --dp-primary-color: var(--color-primary);
  --dp-primary-text-color: #ffffff;
  --dp-background-color: var(--color-secondary-bg);
  --dp-text-color: var(--color-txt-primary);
  --dp-hover-color: var(--color-primary-bg);
  --dp-border-color: var(--color-border-default);
  --dp-border-color-hover: var(--color-border-hover);
}

/* Інпут */
:deep(.dp-custom-input) {
  @apply border-2 border-border-default transition-all
  py-2 text-body-m text-muted shadow-active-tab;
}

:deep(.dp__input) {
  @apply border-2 rounded-lg;
}

:deep(.dp__input_icon) {
  @apply text-txt-primary;
}

:deep(.dp--clear-btn) {
  @apply hidden;
}

:deep(.dp-custom-input:hover) {
  @apply border-border-hover;
}

:deep(.dp__input_focus) {
  @apply border-primary;
}

/* Випадаюче меню (Календар) */
:deep(.dp__menu) {
  @apply rounded-r-xl border-border-default shadow-select-shadow;
}

:deep(.dp__calendar_header_item), :deep(.dp__cell_inner) {
  @apply text-ui-caption;
}

:deep(.dp__month_year_select) {
  @apply rounded-2xl text-ui-label;
}

:deep(.dp__cell_inner:hover) {
  @apply bg-primary-bg text-primary;
}

:deep(.dp__month_year_select:hover) {
  @apply bg-primary-bg text-primary;
}

:deep(.dp__inner_nav:hover) {
  @apply bg-primary-bg text-primary;
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
