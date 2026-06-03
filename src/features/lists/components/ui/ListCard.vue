<script setup lang="ts">
import ListName from "@/features/lists/components/ui/ListName.vue";
import type { List } from "@/features/lists/types/index";
import type { ModalType } from "@/shared/types";
import { VContainer, VDropDown } from "@/shared/ui/index";

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
      <div class="flex items-start gap-4 text-body-l">
        <span class="text-secondary">{{ list.totalTasks }} {{ $t("lists.card.tasks") }}</span>
        <span class="text-muted">{{ list.completedTasks }} {{ $t("lists.card.completed") }}</span>
      </div>
    </template>
  </VContainer>
</template>
