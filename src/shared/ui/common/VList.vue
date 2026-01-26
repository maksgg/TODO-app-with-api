<script setup lang="ts">
import { computed } from "vue";

type ListItem = Record<string, any>;

type ListProps = {
  listItems: ListItem[] | string[];
  simpleList?: number;
};

const { listItems, simpleList } = defineProps<ListProps>();

const mainList = computed(() => listItems || simpleList);
</script>

<template>
  <ul v-bind="$attrs">
    <li
      v-for="(item, index) in mainList"
      :key="index"
    >
      <slot
        :item="item"
        :index="index"
      >
        {{ item }}
      </slot>
    </li>
  </ul>
</template>

