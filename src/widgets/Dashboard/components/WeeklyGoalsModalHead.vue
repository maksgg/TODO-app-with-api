<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { total, mode } = defineProps<{
  mode: "edit" | "add" | null;
  total: number | undefined;
}>();

const { t } = useI18n();
const title = computed(() => {
  if (mode === "edit") {
    return t("dasboard.modalTitle.edit_weekly_focus_goals");
  }
  return t("dasboard.modalTitle.add-weekly_goals");
});
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <div class="flex justify-between gap-2">
      <h3 class="text-modalHead text-txtPrimary">
        {{ title }}
      </h3>
      <span
        v-if="total"
        class="text-bodyM text-muted"
      >
        {{ `${total} /3 ${$t("dasboard.modalTitle.selected")}` }}
      </span>
    </div>
    <span class="text-uiCaption text-secondary">
      {{ $t("dasboard.modalTitle.choose_up_to_3_tasks_to_focus_on_this_week") }}
    </span>
  </div>
</template>

