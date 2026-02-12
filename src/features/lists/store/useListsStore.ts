import { defineStore } from "pinia";

import useListsRequests from "@/features/lists/api/useListsRequests";

export const useListsStore = defineStore("userLists", () => {
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
  };
});
