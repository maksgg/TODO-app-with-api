import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { toast } from "vue-sonner";

import useListsRequests from "@/features/lists/api/useListsRequests";
import type { ModalType } from "@/features/lists/types/index";

export const userListsStore = defineStore("userLists", () => {
  const isModalType = ref<ModalType | null>(null);
  const listId = ref<string | null>(null);
  const initialPayload = ref(null);
  const listPayload = ref({
    title: "",
    hexColor: "#3B82F6",
  });
  const payloadParams = ref({
    q: "",
    sort: { name: "Recently created", value: "createdAt:desc" },
    order: "",
  });

  const {
    fetchAllUserLists,
    deleteUserList,
    createUserList,
    updateUserLists,
  } = useListsRequests();

  const {
    data: allLists,
    loading: allListsLoader,
    execute: fetchAllLists,
  } = fetchAllUserLists({ debounce: 500 });

  const hasLists = computed(() => !!allLists.value?.data?.length);
  const requestParams = computed(() => {
    const rawSort = payloadParams.value.sort?.value || "createdAt:desc";

    const [field, direction] = rawSort.split(":");

    return {
      q: payloadParams.value.q,
      sort: field,
      order: direction,
    };
  });
  const emptyPageState = computed(() => !allListsLoader.value && allLists.value && !hasLists.value);
  const mainLoader = computed(
    () => updateLoading.value || createLoading.value || deleteLoading.value,
  );
  const targetListName = computed(
    () => allLists.value?.data.find((el) => el._id === listId.value)?.title || "",
  );
  const isChangedListPayload = computed(
    () => JSON.stringify(listPayload.value) === JSON.stringify(initialPayload.value),
  );

  const getAllLists = async () => {
    await fetchAllLists({ params: requestParams.value });
  };

  const openModal = (modalType: ModalType, id?: string) => {
    isModalType.value = modalType;
    if (id) {
      listId.value = id;
    }
    if (modalType === "edit") {
      const existingList = allLists.value.data.find((el) => el._id === id);
      listPayload.value = {
        title: existingList.title,
        hexColor: existingList.hexColor,
      };
      initialPayload.value = { ...listPayload.value };
    }
  };

  const listsActions = [{ value: "edit", label: "Edit list" }, { value: "remove", label: "Delete list", dangerous: true }];

  const actions = (id: string, mode: "edit" | "remove") => {
    switch (mode) {
      case "edit": openModal("edit", id);
        break;
      case "remove": openModal("delete", id);
        break;
    }
  };

  const closeModal = () => {
    isModalType.value = null;
    listId.value = null;
    listPayload.value = { title: "", hexColor: "#3B82F6" };
  };

  const { execute: executeUpdate, loading: updateLoading } = updateUserLists("", {
    onSuccess: () => {
      toast.success("List updated successfully");
      closeModal();
      getAllLists();
    },
  });
  const { execute: executeCreate, loading: createLoading } = createUserList({
    onSuccess: () => {
      toast.success("List created successfully");
      closeModal();
      getAllLists();
    },
  });
  const { execute: deleteList, loading: deleteLoading } = deleteUserList("",  {
    onSuccess: () => {
      toast.success("List deleted successfully");
      closeModal();
      getAllLists();
    },
  });

  const request = async () => {
    switch (isModalType.value) {
      case "edit":
        await executeUpdate({ url: `/lists/${listId.value}`, data: listPayload });
        break;
      case "create":
        await executeCreate({ data: listPayload });
        break;
      case "delete":
        await deleteList({ url: `/lists/${listId.value}` });
        break;
    }
  };

  return  {
    isModalType,
    listId,
    payloadParams,
    targetListName,
    allLists,
    listPayload,
    openModal,
    closeModal,
    allListsLoader,
    mainLoader,
    hasLists,
    emptyPageState,
    getAllLists,
    request,
    actions,
    listsActions,
    isChangedListPayload,
  };
});
