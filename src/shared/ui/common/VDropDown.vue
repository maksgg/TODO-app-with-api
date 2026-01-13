<script setup lang="ts">
import { computed, ref, useId } from "vue";

import VLoader from "./VLoader.vue";

type Item = {
  key?: string;
  value: string;
  label?: string;
  disabled?: boolean | null;
  flag?: string | null;
};

type DropDown = {
  id?: string;
  title?: string;
  modelValue?: string | number | null;
  items: Item[];
  disabled?: boolean;
  trigger?: "icon" | null;
  variant?: "primary" | "custom" | "languages";
  placement?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  loader?: boolean;
};

const props = withDefaults(defineProps<DropDown>(), {
  id: "",
  title: "DropDown",
  modelValue: null,
  items: () => [],
  disabled: false,
  trigger: null,
  variant: "primary",
  placement: "bottomLeft",
  loader: false,
});

const mainId = computed(() => props.id || useId());
const isOpened = ref(false);

const emit = defineEmits<{
  "update:modelValue": [string],
  "action": [id?: string, value?: string, key?: string],
  "update:loader": [value: boolean],
}>();

const toggle = (): void => {
  if (props.disabled) return;
  isOpened.value = !isOpened.value;
};

const selectedValue = (item: Item) => {
  emit("update:modelValue", item.value);
  emit("action", mainId.value, item.value, item.key);
  isOpened.value = !isOpened.value;
};

const selectedLabel = computed((): string => {
  if(props.modelValue === null) {
    return props.title;
  }

  const selectedItem = props.items.find(el => el.value === props.modelValue);

  return !selectedItem ? props.title : selectedItem.label || selectedItem.value;
});

const triggerStyle: Record<DropDown["variant"], string> = {
  primary: "border bg-white p-1 rounded-lg",
  custom: "border rounded-t-md p-1 bg-red-500 text-white",
  languages: "bg-primary p-1 text-text-color",
};
const menuStyle: Record<DropDown["variant"], string> = {
  primary: "border rounded-md bg-white p-1",
  custom: "border rounded-b-md p-1 bg-red-500 text-white",
  languages: "bg-primary p-1 text-text-color",
};
const placementStyle: Record<DropDown["placement"], string> = {
  topLeft: "bottom-full left-0",
  topRight: "bottom-full right-0",
  bottomLeft: "top-full left-0",
  bottomRight: "top-full right-0",
};
</script>

<template>
  <div
    class="relative cursor-pointer"
    tabindex="0"
    @focusout="isOpened = false"
  >
    <button
      :class="[
        'flex items-center gap-2 transition-all',
        disabled ? 'cursor-not-allowed opacity-50' : '',
        props.trigger === 'icon' ? 'p-1' : triggerStyle[props.variant]
      ]"
      :disabled="props.disabled"
      @click="toggle"
    >
      <slot
        v-if="$slots.trigger"
        name="trigger"
        :toggle="toggle"
        :label="selectedLabel"
      />

      <template v-else>
        <VueFeather
          v-if="props.trigger === 'icon'"
          type="more-horizontal"
        />

        <template v-else>
          <span class="block whitespace-nowrap overflow-hidden text-ellipsis">
            {{ selectedLabel }}
          </span>

          <span class="flex items-center shrink-0">
            <VueFeather
              v-if="!props.loader"
              type="chevron-down"
            />
            <VLoader
              v-else
              size="sm"
            />
          </span>
        </template>
      </template>
    </button>
    <ul
      v-if="isOpened"
      :class="[
        'absolute flex flex-col shadow-lg z-20 w-max min-w-full text-start',
        menuStyle[props.variant], placementStyle[props.placement],
        disabled ? 'cursor-not-allowed' : ''
      ]"
      @mousedown.prevent
    >
      <li
        v-for="item in props.items"
        :key="item.value"
        class="px-5 py-4 hover:bg-gray-200"
        @click="selectedValue(item)"
      >
        <slot
          name="options"
          :item="item"
        >
          {{ item.label }}
        </slot>
      </li>
    </ul>
  </div>
</template>
