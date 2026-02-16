<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

import { RequestParams } from "../types";
import DeleteListModal from "./ui/DeleteListModal.vue";
import ListCard from "./ui/ListCard.vue";
import ListsModalFormFields from "./ui/ListsModalFormFields.vue";
import UserListCard from "./ui/UserListCard.vue";
import { useListModal } from "../composables/useListModal";
import { groupListsByUser } from "../utils/groupListsByUser";

import { useListsStore } from "@/features/lists/store/useListsStore";
import { usePermissions } from "@/shared/composables/usePermissions";
import VButton from "@/shared/ui/common/VButton.vue";
import VModal from "@/shared/ui/common/VModal.vue";

const { currentTab, params } = defineProps<{
  currentTab: "myLists" | "usersLists";
  params: RequestParams;
}>();
const { isAllowed } = usePermissions();
const listStore = useListsStore();
const router = useRouter();
const {
  openModal,
  modalRequest,
  closeModal,
  modalLoader,
  listPayload,
  isModalType,
  targetList,
  isChanged,
} = useListModal(() => params);

const isExpanded = ref<string | null>(null);
const allUsersLists = computed(() => groupListsByUser(listStore.allLists?.data));
const expandList = (id: string) => isExpanded.value = isExpanded.value === id ? null : id;
const openTargetList = (id: string) => {
  expandList(id);
  router.replace({ name: "List", query: { id } });
};

const listActions = [
  { value: "edit", label: "Edit list", disabled: !isAllowed("update:list") },
  { value: "delete", label: "Delete list", disabled: !isAllowed("delete:list"), dangerous: true },
];
const activeModalType = computed(() => {
  if (isModalType.value === "edit") {
    return {
      title: "Edit list",
      btnText: "Save changes",
    };
  }

  return {
    title: "Create list",
    btnText: "Create list",
  };
});
</script>

<template>
  <div>
    <Teleport
      to="#header-action"
      defer
    >
      <VButton
        text="Create new list"
        icon="plus"
        :disabled="!isAllowed('create:list')"
        @click="openModal('create')"
      />
    </Teleport>
    <div
      v-if="isAllowed('read:list')"
      class="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6"
    >
      <template v-if="currentTab === 'myLists'">
        <ListCard
          v-for="list in listStore.allLists?.data"
          :key="list._id"
          :list="list"
          :list-actions="listActions"
          @open-modal="openModal"
          @open-list="openTargetList"
        />
      </template>
      <template v-if="currentTab === 'usersLists'">
        <UserListCard
          v-for="list in allUsersLists"
          :key="list.userListsInfo.ownerId"
          :user-lists-info="list.userListsInfo"
          :total-lists="list.totalLists"
          :disabled="!isAllowed('read:all-tasks')"
          :is-expanded="isExpanded === list.userListsInfo.ownerId"
          @expand-list="expandList"
          @open-list="openTargetList"
        />
      </template>
    </div>
    <VModal
      id="createAndEdit-list"
      :title="activeModalType.title"
    >
      <ListsModalFormFields v-model="listPayload" />
      <template #footer>
        <div class="flex gap-5 w-full justify-end">
          <VButton
            text="Cancel"
            class="!bg-transparent text-primary"
            @click="closeModal"
          />
          <VButton
            :text="activeModalType.btnText"
            :loader="modalLoader"
            :disabled="modalLoader || !isChanged"
            @click="modalRequest"
          />
        </div>
      </template>
    </VModal>
    <DeleteListModal
      :list="targetList"
      :loader="modalLoader"
      @close="closeModal"
      @request="modalRequest"
    />
  </div>
</template>
