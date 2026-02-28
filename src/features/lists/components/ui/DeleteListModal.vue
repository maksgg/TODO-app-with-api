<script setup lang="ts">
import type { List } from "../../types";

import VButton from "@/shared/ui/common/VButton.vue";
import VModal from "@/shared/ui/common/VModal.vue";

const { list = null, loader } = defineProps<{ list: List | null; loader?: boolean; }>();

const emit = defineEmits<{ "close": [void], "request": [void] }>();
const closeModal = () => emit("close");
const request = () => emit("request");
</script>

<template>
  <VModal
    id="delete-list"
    :title="$t('lists.modal.delete_list')"
  >
    <div class="flex flex-col gap-2 text-center">
      <h4 class="text-uiHead text-txtPrimary">
        {{ $t("lists.modal.are_you_sure_you_want_to_delete") }}
        <span>"{{ list?.title }}"</span>
        {{ $t("lists.modal.list?") }}
      </h4>
      <p class="text-bodyM text-secondary">
        {{ $t("lists.modal.this_action_can’t_be_undone") }}
      </p>
    </div>
    <template #footer>
      <div class="flex gap-5 w-full justify-center">
        <VButton
          :text="$t('lists.modalBtn.cancel')"
          class="!bg-transparent text-primary"
          @click="closeModal"
        />
        <VButton
          :text="$t('lists.modalBtn.delete_list')"
          variant="dangerous"
          :loader="loader"
          :disabled="loader"
          @click="request"
        />
      </div>
    </template>
  </VModal>
</template>
