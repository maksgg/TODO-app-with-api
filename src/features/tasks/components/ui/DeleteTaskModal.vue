<script setup lang="ts">
import { Task } from "../../types/index";

import VButton from "@/shared/ui/common/VButton.vue";
import VModal from "@/shared/ui/common/VModal.vue";

const { task = null, loader } = defineProps<{ task: Partial<Task> | null; loader?: boolean; }>();

const emit = defineEmits<{ "close": [void], "request": [void] }>();
const closeModal = () => emit("close");
const request = () => emit("request");
</script>

<template>
  <VModal
    id="delete-task"
    :title="$t('tasks.modal.delete_task')"
  >
    <div class="flex flex-col gap-2 text-center">
      <h4 class="text-uiHead text-txtPrimary">
        {{ $t("tasks.modal.are_you_sure_you_want_to_delete") }}
        <span>"{{ task?.title }}"</span>
        {{ $t("tasks.modal.task?") }}
      </h4>
      <p class="text-bodyM text-secondary">
        {{ $t("tasks.modal.this_action_can’t_be_undone") }}
      </p>
    </div>
    <template #footer>
      <div class="flex gap-5 w-full justify-center">
        <VButton
          :text="$t('tasks.modalBtn.cancel')"
          class="!bg-transparent text-primary"
          @click="closeModal"
        />
        <VButton
          :text="$t('tasks.modalBtn.delete list')"
          variant="dangerous"
          :loader="loader"
          :disabled="loader"
          @click="request"
        />
      </div>
    </template>
  </VModal>
</template>
