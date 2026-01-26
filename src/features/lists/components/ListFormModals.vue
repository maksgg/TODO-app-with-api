<script setup lang="ts">
import {  computed } from "vue";

import { userListsStore } from "../store/useListsStore";

import VColorPicker from "@/shared/ui/common/VColorPicker.vue";
import VInput from "@/shared/ui/common/VInput.vue";
import VModal from "@/shared/ui/common/VModal.vue";

const hexColors = [
  { id: "#3B82F6", color: "#3B82F6" },
  { id: "#8B5CF6", color: "#8B5CF6" },
  { id: "#14B8A6", color: "#14B8A6" },
  { id: "#22C55E", color: "#22C55E" },
  { id: "#FACC15", color: "#FACC15" },
  { id: "#FB923C", color: "#FB923C" },
  { id: "#EF4444", color: "#EF4444" },
  { id: "#EC4899", color: "#EC4899" },
];
const listsStore = userListsStore();

const isOpen = computed({
  get: () => !!listsStore.isModalType,
  set: (val) => !val && listsStore.closeModal(),
});

const modalContent = computed(() => {
  if (listsStore.isModalType === "edit") {
    return {
      containerTag: "form" as const,
      modalTitle: "Edit list",
      modalSize: "lg" as const,
      btnText: "Save changes",
      btnVariant: "primary" as const,
    };
  };
  if (listsStore.isModalType === "delete") {
    return {
      containerTag: "div" as const,
      modalTitle: "Delete list",
      modalSize: "md" as const,
      btnText: "Delete list",
      btnVariant: "dangerous" as const,
    };
  };

  return {
    containerTag: "form" as const,
    modalTitle: "Create new list",
    modalSize: "lg" as const,
    btnText: "Create list",
    btnVariant: "primary" as const,
  };
});
</script>

<template>
  <VModal
    v-model="isOpen"
    :as="modalContent.containerTag"
    :title="modalContent.modalTitle"
    :btn-title="modalContent.btnText"
    :btn-variant="modalContent.btnVariant"
    :size="modalContent.modalSize"
    :loader="listsStore.mainLoader"
    :is-changed="listsStore.isChangedListPayload"
    @submit="listsStore.request"
  >
    <template
      v-if="listsStore.isModalType !== 'delete'"
      #main
    >
      <div class="flex flex-col gap-2 text-left">
        <VInput
          v-model="listsStore.listPayload.title"
          label="List name"
          placeholder="Enter list name"
        />
        <VColorPicker
          v-model="listsStore.listPayload.hexColor"
          title="List color"
          :items="hexColors"
        />
      </div>
    </template>
    <template
      v-else
      #main
    >
      <div>
        <h4 class="font-bold">
          Are you sure you want to delete <span>"{{ listsStore.targetListName }}"</span> list?
        </h4>
        <p class="text-sm">
          All tasks inside this list will be permanently removed
        </p>
      </div>
    </template>
  </VModal>
</template>
