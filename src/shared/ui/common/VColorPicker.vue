<script setup lang="ts">
type CircleItem = {
  id: string | number;
  color: string;
};

const {
  items = [],
  title = "",
} = defineProps<{
  items: CircleItem[];
  title?: string;
}>();

const activeColor = defineModel<string>();

const selectItem = (color: string) => activeColor.value = color;
</script>

<template>
  <div class="flex flex-col gap-2 text-uiLabel text-secondary">
    <span>{{ title }}</span>
    <div class="flex gap-3">
      <button
        v-for="item in items"
        :key="item.id"
        type="button"
        class="w-6 h-6 rounded-full transition-all duration-200 ease-out
         hover:scale-105 hover:shadow-lg active:scale-95"
        :style="{
          backgroundColor: item.color,
          '--hover-shadow': item.color + '40'
        }"
        :class="[
          activeColor === item.color ?
            'ring-1 ring-offset-1 ring-toggle' :
            'hover:ring-2 hover:ring-offset-1 hover:ring-gray-300'
        ]"
        @click="selectItem(item.color)"
      />
    </div>
  </div>
</template>
