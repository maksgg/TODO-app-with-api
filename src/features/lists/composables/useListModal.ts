import { computed, shallowRef, ref } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";

import useListsRequests from "../api/useListsRequests";
import { useListsStore } from "../store/useListsStore";
import type {
  List, ListModal,
  ListOptions,
} from "../types";

import { useModal } from "@/shared/composables/useModal";

export const useListModal = (options: ListOptions) => {
  const isModalType = ref<ListModal | null>(null);
  const listPayload = ref({ title: "", hexColor: "#3B82F6" });
  const targetList = shallowRef<List | null>(null);

  const listStore = useListsStore();
  const { t } = useI18n();
  const {
    createUserList,
    updateUserLists,
    deleteUserList,
  } = useListsRequests();

  const modal = {
    create: useModal("createAndEdit-list"),
    edit: useModal("createAndEdit-list"),
    delete: useModal("delete-list"),
  };

  const openModal = (type: ListModal, list?: List) => {
    isModalType.value = type;
    targetList.value = list;

    if (isModalType.value === "edit") {
      listPayload.value.title = list.title;
      listPayload.value.hexColor = list.hexColor;
    }
    modal[isModalType.value].open();
  };

  const isChanged = computed(() => {
    if (isModalType.value === "create") {
      return listPayload.value.title.trim() !== "";
    }

    if (isModalType.value === "edit") {
      return (
        listPayload.value.title !== targetList.value.title ||
        listPayload.value.hexColor !== targetList.value.hexColor
      );
    }

    return false;
  });

  const modalLoader = computed(
    () => updateLoader.value || createLoader.value || deleteLoader.value);

  const modalRequest = () => {
    switch (isModalType.value) {
      case "create": createList(); break;
      case "edit": updateList(); break;
      case "delete": deleteList(); break;
    }
  };

  const closeModal = () => {
    modal[isModalType.value].close();
    isModalType.value = null;
    targetList.value = null;
    listPayload.value = { title: "", hexColor: "#3B82F6" };
  };

  const { execute: createList, loading: createLoader } = createUserList({
    data: listPayload,
    onSuccess: () => {
      toast.success(t("lists.toasts.list_created_successfully"));
      closeModal();
      options.searchQuery.value = "";
    },
  });

  const { execute: updateList, loading: updateLoader } = updateUserLists(
    () => targetList.value._id,
    {
      data: listPayload,
      onSuccess: () => {
        toast.success(t("lists.toasts.list_updated_successfully"));
        closeModal();
        listStore.getAllLists({ params: options.params });
      },
    });

  const { execute: deleteList, loading: deleteLoader } = deleteUserList(
    () => targetList.value._id,
    {
      onSuccess: () => {
        toast.success(t("lists.toasts.list_deleted_successfully"));
        closeModal();
        listStore.getAllLists({ params: options.params });
      },
    });

  return {
    openModal,
    modalRequest,
    closeModal,
    modalLoader,
    listPayload,
    targetList,
    isChanged,
    isModalType,
  };
};
