<script setup lang="ts">
import { ref } from "vue";
import Multiselect from "vue-multiselect";

import VIcon from "./VIcon.vue";

const {
  title = "",
  options = [],
  placeholder = "",
} = defineProps<{
  title?: string;
  options: { name: string, value: string }[];
  placeholder?: string;
}>();

const model = defineModel<{ name: string; value: string; } | null | undefined>("model");

const isOpen = ref(false);
</script>

<template>
  <div class="flex items-center gap-2">
    <span
      v-if="title"
      class="whitespace-nowrap"
    >
      {{ title }}
    </span>
    <Multiselect
      v-model="model"
      :options="options"
      :searchable="false"
      :clear-on-select="true"
      label="name"
      track-by="value"
      :placeholder="placeholder"
      @open="isOpen = true"
      @close="isOpen = false"
    >
      <template #caret="{ toggle }">
        <button
          type="button"
          class="caret-click-zone"
          @mousedown.prevent.stop="toggle"
        >
          <VIcon
            type="chevronDown"
            :class="['icon', { 'is-active': isOpen }]"
          />
        </button>
      </template>
    </Multiselect>
  </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style scoped>
  /* Основне поле */
:deep(.multiselect) {
  @apply relative h-10 cursor-pointer;
}
:deep(.multiselect--active) {
  @apply rounded-none;
}
:deep(.multiselect__single) {
  @apply truncate;
}

/* Випадаючий список */
:deep(.multiselect__content-wrapper) {
  @apply absolute left-0 bg-secondaryBg mt-1 rounded-lg
  border-borderDefault hover:border-borderHover drop-shadow-primary
  shadow-xl z-[100] overflow-y-auto max-h-[500px];
}
/* Підсвітка при наведенні */
:deep(.multiselect__option--highlight) {
  @apply bg-transparent text-txtPrimary;
}
:deep(.multiselect__tags) {
  @apply pr-10 rounded-lg border-2 bg-none
  border-borderDefault hover:border-borderHover;
}
:deep(.multiselect--active .multiselect__tags) {
  @apply rounded-lg border-primary
}
/* Обраний елемент у списку */
:deep(.multiselect__option--selected) {
  @apply bg-transparent text-primary font-medium;
}
/* 2. Ховаємо технічні елементи бібліотеки (підказки Enter/Selected) */
:deep(.multiselect__option::after),
:deep(.multiselect__option::before) {
  display: none;
}

.caret-click-zone {
  position: absolute;
  right: 0;
  top: 0;
  width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
}
.icon {
  /* Початковий стан — дивиться вниз */
  transition: transform 0.2s ease-in-out;
  transform: rotate(0deg);
}

/* Стан, коли селект відкритий 👇 */
.icon.is-active {
  transform: rotate(180deg);
}
</style>
