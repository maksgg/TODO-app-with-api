import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { toast } from "vue-sonner";

import useTasksRequests from "../api/useTasksRequests";
import { Task } from "../types";

import { formatDate } from "@/shared/utils/dateFormatter";

export const useTasksStore = defineStore("tasks", () => {
  const isModalType = ref<"edit" | "delete" | "create" | null>(null);
  const listId = ref<string | null>(null);
  const taskId = ref<string | null>(null);
  const pagination = ref({
    limit: 20,
    hasMore: false,
  });
  const toolBarPayload = ref({
    priority: { name: "All priorities", value: "all:priority" },
    sort: { name: "Recently created", value: "createdAt:desc" },
    order: "",
  });
  const priorityModalSelect = ref({
    name: "High",
    value: "high",
  });
  const modalFields = ref({
    taskName: "",
    taskTags: "",
  });

  const emptyPageState = computed(
    () => !loading.value && allTasks.value && !allTasks.value?.data?.length,
  );

  const requestParams = computed(() => {
    const rawSort = toolBarPayload.value.sort?.value || "createdAt:desc";
    // const priorityValue = toolBarPayload.value.priority.value || "all";

    const [field, direction] = rawSort.split(":");

    return {
      limit: pagination.value.limit,
      sort: field,
      order: direction,
      // priority: priorityValue,
    };
  });

  const mainLoader = computed(
    () => loading.value ||
    updateLoading.value ||
    createLoading.value ||
    deleteLoading.value ||
    completeLoading.value,
  );

  const targetTask = computed(
    () => allTasks.value?.data?.find((el) => el.id === taskId.value),
  );
  const pendingTasks = computed(
    () => allTasks.value?.data?.filter((el) => el.status !== "done"),
  );
  const completedTasks = computed(
    () => allTasks.value?.data?.filter((el) => el.status === "done"),
  );

  const {
    fetchCreateTask,
    fetchAllTasks,
    fetchUpdateTask,
    fetchDeleteTargetTask,
    fetchCompleteTask,
  } = useTasksRequests();

  const { data: allTasks, execute: getAllTasks, loading } = fetchAllTasks("", {
    onSuccess: ({ data }) => {
      data.data.forEach((el) => el.deadline = formatDate(el.createdAt, "short"));
      pagination.value = data.pagination;
    },
  });

  const loadData = async () => {
    await getAllTasks({ url: `/tasks/lists/${listId.value}`, params: requestParams.value });
  };

  const openModal = (modalType: "edit" | "delete" | "create", id?: string) => {
    isModalType.value = modalType;
    if (modalType === "create") {
      listId.value = id;
    }
    if (modalType === "edit") {
      taskId.value = id;
    }
    if (modalType !== "delete" && allTasks.value?.data) {
      const existingList = allTasks.value.data.find((el) => el.id === id);
      if (existingList) {
        modalFields.value.taskName = existingList.title;
      }
    }
  };

  const closeModal = () => {
    isModalType.value = null;
    taskId.value = null;
    listId.value = null;
    modalFields.value = {
      taskName: "",
      taskTags: "",
    };
  };

  const listsActions = [{ value: "edit", label: "Edit task" }, { value: "remove", label: "Delete task", dangerous: true }];

  const actions = (id: string, mode: "edit" | "remove") => {
    switch (mode) {
      case "edit": openModal("edit", id);
        break;
      case "remove": openModal("delete", id);
        break;
    }
  };

  const { execute: executeUpdate, loading: updateLoading } = fetchUpdateTask("", {
    onSuccess: () => {
      toast.success("Task updated successfully");
      closeModal(); // will be listId null if update status without opening modal
      loadData();
    },
  });
  const { execute: executeCreate, loading: createLoading } = fetchCreateTask("", {
    onSuccess: () => {
      toast.success("Task created successfully");
      closeModal();
      loadData();
    },
  });
  const { execute: deleteTask, loading: deleteLoading } = fetchDeleteTargetTask("",  {
    onSuccess: () => {
      toast.success("Task deleted successfully");
      closeModal();
      loadData();
    },
  });

  const { execute: completeTask, loading: completeLoading } = fetchCompleteTask("", {
    onSuccess: () => {
      toast.success("Status updated");
      loadData();
    },
  });

  const request = async () => {
    switch (isModalType.value) {
      case "edit":
        await executeUpdate({ url: `/tasks/${taskId.value}`/* ,  data: toolBarPayload  */ });
        break;
      case "create":
        await executeCreate({ url: `/tasks/${listId.value}` /* data: listPayload */ });
        break;
      case "delete":
        await deleteTask({ url: `/tasks/${taskId.value}` });
        break;
    }
  };

  const updateTaskStatus = async (id: string, status: Task["status"]) => {
    await executeUpdate({ url: `/tasks/${id}`, data: { status: status } });
    loadData();
  };

  const toggleTaskStatus = async (id: string, status: boolean) => {
    await completeTask({ url: `/tasks/${id}/complete`, data: { completed: status } });
  };

  return {
    loadData,
    toggleTaskStatus,
    updateTaskStatus,
    allTasks,
    emptyPageState,
    mainLoader,
    toolBarPayload,
    pagination,
    listsActions,
    actions,
    request,
    openModal,
    closeModal,
    requestParams,
    isModalType,
    listId,
    taskId,
    priorityModalSelect,
    targetTask,
    modalFields,
    pendingTasks,
    completedTasks,
  };
});
