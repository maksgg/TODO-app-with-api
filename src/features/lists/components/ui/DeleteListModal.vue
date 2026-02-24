<script setup lang="ts">
import { List } from "../../types";

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
    title="Delete list"
  >
    <div class="flex flex-col gap-2 text-center">
      <h4 class="text-uiHead text-txtPrimary">
        Are you sure you want to delete <span>"{{ list?.title }}"</span> list?
      </h4>
      <p class="text-bodyM text-secondary">
        This action can’t be undone
      </p>
    </div>
    <template #footer>
      <div class="flex gap-5 w-full justify-center">
        <VButton
          text="Cancel"
          class="!bg-transparent text-primary"
          @click="closeModal"
        />
        <VButton
          text="Delete list"
          variant="dangerous"
          :loader="loader"
          :disabled="loader"
          @click="request"
        />
      </div>
    </template>
  </VModal>
</template>
