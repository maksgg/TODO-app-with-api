import { ref, computed, shallowRef } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue-sonner";

import useTasksRequests from "../api/useTasksRequests";
import { useTasksStore } from "../store/useTasksStore";
import { Task, TaskRequestParams, TasksModals } from "../types";
import { tagsFormatter } from "../utils/tagsFormatter";

import { useModal } from "@/shared/composables/useModal";
import { firstLetterUp } from "@/shared/utils";

export const useTasksModals = (params: () => TaskRequestParams) => {
  const isModalType = ref<TasksModals | null>(null);
  const modalFields = ref({
    title: "",
    tags: "",
    dueDate: null,
    deadline: null,
    priority: { name: "High", value: "high" },
  });
  const originFormState = shallowRef(""); // snapshot todo (do i need it)

  const taskPayload = computed(() => {
    return {
      ...modalFields.value,
      dueDate: new Date(modalFields.value.deadline),
      tags: tagsFormatter(modalFields.value.tags),
      priority: modalFields.value.priority.value as Task["priority"],
    };
  });

  const modalLoader = computed(
    () => updateLoading.value ||
    createLoading.value ||
    deleteLoading.value,
  );

  const isChanged = computed(() => JSON.stringify(modalFields.value) !== originFormState.value);

  const modal = {
    create: useModal("createAndEdit-task"),
    edit: useModal("createAndEdit-task"),
    delete: useModal("delete-task"),
  };
  const tasksStore = useTasksStore();

  const openModal = (modalType?: TasksModals, task?: Task) => {
    isModalType.value = modalType;
    tasksStore.targetTask = task;

    if (modalType === "edit") {
      modalFields.value = {
        title: task.title,
        tags: task.tags.join(", "),
        dueDate: new Date(task.dueDate),
        deadline: new Date(task.dueDate),
        priority: {
          name: firstLetterUp(task.priority),
          value: task.priority,
        },
      };
      originFormState.value = JSON.stringify(modalFields.value);
    }
    modal[modalType].open();
  };

  const closeModal = () => {
    modal[isModalType.value].close();
    isModalType.value = null;
    tasksStore.targetTask = null;
    modalFields.value = {
      title: "",
      tags: "",
      deadline: null,
      dueDate: null,
      priority: { name: "High", value: "high" },
    };
  };

  const route = useRoute();

  const {
    fetchCreateTask,
    fetchUpdateTask,
    fetchDeleteTargetTask,
  } = useTasksRequests();

  const { execute: updateTask, loading: updateLoading } = fetchUpdateTask(
    () => tasksStore.targetTask.id,
    {
      data: taskPayload,
      onSuccess: () => {
        toast.success("Task updated successfully");
        closeModal();
        tasksStore.getAllTasks({ params: params });
      },
    });
  const { execute: createTask, loading: createLoading } = fetchCreateTask(() => route.query.id, {
    data: taskPayload,
    onSuccess: () => {
      toast.success("Task created successfully");
      closeModal();
      tasksStore.getAllTasks({ params: params });
    },
  });
  const { execute: deleteTask, loading: deleteLoading } = fetchDeleteTargetTask(
    () => tasksStore.targetTask.id,
    {
      onSuccess: () => {
        toast.success("Task deleted successfully");
        closeModal();
        tasksStore.getAllTasks({ params: params });
      },
    });

  const modalRequest = () => {
    switch (isModalType.value) {
      case "edit": updateTask(); break;
      case "create": createTask(); break;
      case "delete": deleteTask(); break;
    }
  };

  return {
    modalLoader,
    isModalType,
    modalFields,
    isChanged,
    openModal,
    modalRequest,
    closeModal,
  };
};
