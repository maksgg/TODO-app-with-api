<script setup lang="ts">
import { computed, ref } from "vue";

import VIcon from "./VIcon.vue";
import VLoader from "./VLoader.vue";

type Option = {
  key?: string;
  value: string;
  label?: string;
  disabled?: boolean | null;
  flag?: string | null;
  dangerous?: boolean | unknown;
};

type DropDown = {
  id?: string;
  title?: string;
  modelValue?: string | number | null;
  options: Option[];
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

const isOpened = ref(false);

const emit = defineEmits<{
  "update:modelValue": [string],
  "action": [value?: any, key?: string],
  "update:loader": [value: boolean],
}>();

const toggle = (): void => {
  if (props.disabled) return;
  isOpened.value = !isOpened.value;
};

const selectedValue = (item: Option) => {
  emit("update:modelValue", item.value);
  emit("action", item.value, item.key);
  isOpened.value = !isOpened.value;
};

const selectedLabel = computed((): string => {
  if(props.modelValue === null) {
    return props.title;
  }

  const selectedItem = props.options.find(el => el.value === props.modelValue);

  return !selectedItem ? props.title : selectedItem.label || selectedItem.value;
});

const triggerStyle: Record<DropDown["variant"], string> = {
  primary: "border bg-secondary p-1 rounded-lg shadow-selectShadow",
  custom: "border rounded-t-md p-1 bg-red-500 text-white",
  languages: "bg-primary p-1 text-text-color",
};
const menuStyle: Record<DropDown["variant"], string> = {
  primary: "border rounded-lg bg-secondaryBg border-borderDefault",
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
        <VIcon
          v-if="props.trigger === 'icon'"
          type="horizontalDots"
        />
        <template v-else>
          <span class="block whitespace-nowrap overflow-hidden text-ellipsis">
            {{ selectedLabel }}
          </span>
          <span class="flex items-center shrink-0">
            <VIcon
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
        'absolute flex flex-col shadow-md z-20 w-max min-w-full text-start px-3 py-2',
        menuStyle[props.variant], placementStyle[props.placement],
        disabled ? 'cursor-not-allowed' : ''
      ]"
      @mousedown.prevent
    >
      <li
        v-for="item in props.options"
        :key="item.value"
        :class="[
          'px-2 py-1.5 text-bodyL hover:opacity-75',
          item.dangerous ? 'text-dangerous' : 'text-txtPrimary',
        ]"
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
