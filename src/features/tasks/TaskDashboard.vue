<!-- <script setup lang="ts">
import { ref } from "vue";

import { List } from "../lists/types";
import useTasksRequests from "./api/useTasksRequests";
import ListItem from "./components/ListItem.vue";

// import { formatDateForRequest } from "@/shared/utils/dateFormatter";

const { list/* , titles */ } = defineProps<{ list: List | any[]; titles?: string | any[] }>();

const { fetchTaskWithDeadlines ,fetchTargetTask } = useTasksRequests();
const query = ref({
  limit: "20",
  startDate: "2026-01-17",
  endDate: "2026-01-25",
});

fetchTaskWithDeadlines({
  immediate: true,
  params: query.value,
});


// /* const { data } =  */fetchTargetTask(list[0].tasks[0], {
//   immediate: true,
// });
const headMock = [
  {
    title: "Today's tasks",
    subtitle: "You’ve completed 3 out of 8 tasks",
    gridStyle: "col-span-1 row-span-1",
  },
  {
    title: "Today's tasks",
    subtitle: "You’ve completed 3 out of 8 tasks",
    gridStyle: "col-span-1 row-span-1",
  },
  {
    title: "Today's tasks",
    subtitle: "You’ve completed 3 out of 8 tasks",
    gridStyle: "col-span-2 row-span-2",
  },
];
const mockData = [
  {
    taskTitle: "Learn english",
    listTitle: "Study",
    priority: "Medium",
    tags: ["tag1", "tag2", "tag3"],
    status: "Completed",
  },
  {
    taskTitle: "Learn english",
    listTitle: "Study",
    priority: "Medium",
    tags: ["tag1", "tag2", "tag3"],
    status: "Completed",
  },
  {
    taskTitle: "Learn english",
    listTitle: "Study",
    priority: "Medium",
    tags: ["tag1", "tag2", "tag3"],
    status: "Completed",

  },
  {
    taskTitle: "Learn english",
    listTitle: "Study",
    priority: "Medium",
    tags: ["tag1", "tag2", "tag3"],
    status: "Completed",
  },
  {

    taskTitle: "Learn english",
    listTitle: "Study",
    priority: "Medium",
    tags: ["tag1", "tag2", "tag3"],
    status: "Completed",
  },
];
// computed за датою і відмальовуй компонент іс
</script>

<template>
  <div class="grid grid-cols-2 gap-4 w-full">
    <div
      v-for="(title, index) in headMock"
      :key="index"
      :class="[title.gridStyle, 'flex flex-col gap-4 border border-black rounded-2xl p-6']"
    >
      <div>
        <h3 class="text-headPrimary">
          {{ title.title }}
        </h3>
        <h4 class="text-bodyM">
          {{ title.subtitle }}
        </h4>
      </div>
      <ListItem
        v-for="(el, i) in mockData"
        :key="i"
        :item="el"
      />
    </div>
  </div>
</template> -->
