<script setup lang="ts">
import ListName from "./ListName.vue";
import type { List } from "../../types";

import type { ModalType } from "@/shared/types";
import VContainer from "@/shared/ui/common/VContainer.vue";
import VDropDown from "@/shared/ui/common/VDropDown.vue";

const { list , listActions } = defineProps<{
  list: List;
  listActions: {
    value: string;
    label: string;
    disabled?: boolean;
    dangerous?: boolean;
  }[];
}>();

const emit = defineEmits<{
  "openList": [id: string],
  "openModal": [modalType: ModalType, list?: List]
}>();

const openList = () => emit("openList", list._id);
const openModal = (modalType: ModalType) => emit("openModal", modalType, list);
</script>

<template>
  <VContainer class="hover:scale-105 transition-all">
    <div class="flex justify-between items-center gap-2">
      <ListName
        :hex-color="list.hexColor"
        :title="list.title"
        :list-id="list._id"
        @open-list="openList"
      />
      <VDropDown
        :options="listActions"
        trigger="icon"
        placement="bottomRight"
        icon-type="horizontalDots"
        @action="(val) => openModal(val as ModalType)"
      />
    </div>
    <template #footer>
      <div class="flex items-start gap-4 text-bodyL">
        <span class="text-secondary">{{ list.totalTasks }} {{ $t("lists.card.tasks") }}</span>
        <span class="text-muted">{{ list.completedTasks }} {{ $t("lists.card.completed") }}</span>
      </div>
    </template>
  </VContainer>
</template>

