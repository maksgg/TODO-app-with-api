<script setup lang="ts">
import Multiselect from "vue-multiselect";

const { options, placeholder } = defineProps<{
  options: { name: string, value: string }[];
  placeholder?: string;
}>();

const model = defineModel<{ name: string; value: string; }>("model", { required: true });
</script>

<template>
  <Multiselect
    v-model="model"
    :options="options"
    :searchable="false"
    :clear-on-select="true"
    label="name"
    :placeholder="placeholder"
  />
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style scoped>
  /* Основне поле */
:deep(.multiselect) {
  @apply relative min-w-[7rem] cursor-pointer;
}
:deep(.multiselect__single) {
  @apply truncate min-w-[7rem];
}
/* Випадаючий список */
:deep(.multiselect__content-wrapper) {
  @apply absolute left-0 bg-primary border-gray-200
  shadow-xl z-[100] overflow-y-auto max-h-[500px];
}
/* Підсвітка при наведенні */
:deep(.multiselect__option--highlight) {
  @apply bg-gray-200 text-gray-900;
}
/* Обраний елемент у списку */
:deep(.multiselect__option--selected) {
  @apply bg-blue-50 text-text-color font-medium;
}
/* 2. Ховаємо технічні елементи бібліотеки (підказки Enter/Selected) */
:deep(.multiselect__option::after),
:deep(.multiselect__option::before) {
  display: none;
}
</style>
