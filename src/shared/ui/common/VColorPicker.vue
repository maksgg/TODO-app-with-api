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
  <div class="flex flex-col gap-2 text-uiLabel">
    <span>{{ title }}</span>
    <div class="flex gap-3">
      <button
        v-for="item in items"
        :key="item.id"
        type="button"
        class="w-6 h-6 rounded-full hover:border-2 hover:border-gray-200"
        :style="{ backgroundColor: item.color }"
        :class="[
          activeColor === item.color
            ? 'border-2  border-black hover:border-black'
            : ''
        ]"
        @click="selectItem(item.color)"
      />
    </div>
  </div>
</template>
