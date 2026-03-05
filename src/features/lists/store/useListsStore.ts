import { defineStore } from "pinia";
import { ref } from "vue";

import useListsRequests from "@/features/lists/api/useListsRequests";

export const useListsStore = defineStore("userLists", () => {
  const currentTab = ref<"myLists" | "usersLists">("myLists");
  const { getAllUserLists } = useListsRequests();

  const {
    data: allLists,
    loading: allListsLoader,
    execute: getAllLists,
  } = getAllUserLists();

  return  {
    allLists,
    allListsLoader,
    getAllLists,
    currentTab,
  };
});
