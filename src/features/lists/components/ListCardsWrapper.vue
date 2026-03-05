<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import type { RequestParams } from "../types";
import DeleteListModal from "./ui/DeleteListModal.vue";
import ListCard from "./ui/ListCard.vue";
import ListsModalFormFields from "./ui/ListsModalFormFields.vue";
import UserListCard from "./ui/UserListCard.vue";
import { useListModal } from "../composables/useListModal";
import { groupListsByUser } from "../utils/groupListsByUser";

import { useListsStore } from "@/features/lists/store/useListsStore";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import VButton from "@/shared/ui/common/VButton.vue";
import VModal from "@/shared/ui/common/VModal.vue";

const { currentTab, params } = defineProps<{
  currentTab: "myLists" | "usersLists";
  params: RequestParams;
}>();

const listStore = useListsStore();
const authStore = useAuthStore();
const { t } = useI18n();
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
  router.push({ name: "Tasks", params: { id } });
};

const listActions = computed(() =>[
  { value: "edit", label: t("lists.actions.edit_list"), disabled: !authStore.isAllowed("update:list") },
  { value: "delete", label: t("lists.actions.delete_list"), disabled: !authStore.isAllowed("delete:list"), dangerous: true },
]);
const activeModalType = computed(() => {
  if (isModalType.value === "edit") {
    return {
      title: t("lists.modal.edit_list"),
      btnText: t("lists.modalBtn.save_changes"),
    };
  }

  return {
    title: t("lists.modal.create_list"),
    btnText: t("lists.modalBtn.create_list"),
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
        v-if="currentTab === 'myLists'"
        :text="$t('lists.btn.create_new_list')"
        icon="plus"
        :disabled="!authStore.isAllowed('create:list')"
        @click="openModal('create')"
      />
    </Teleport>
    <div
      v-if="authStore.isAllowed('read:list')"
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
          :disabled="!authStore.isAllowed('read:all-tasks')"
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
            :text="$t('lists.modalBtn.cancel')"
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
