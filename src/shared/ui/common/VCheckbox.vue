<script setup lang="ts">
import { computed, useId } from "vue";

import VIcon from "./VIcon.vue";

type CheckboxStyle = "primary" | "custom" | "icon";

type CheckboxProps = {
  id?: string;
  text?: string;
  modelValue?: boolean;
  disabled?: boolean;
  icon?: string;
  variant?: CheckboxStyle;
  type?: string;
};

const props = withDefaults(defineProps<CheckboxProps>(), {
  id: "",
  text: "",
  modelValue: false,
  disabled: false,
  icon: "",
  variant: "primary",
  type: "checkbox",
});

const inputId = computed(() => props.id || `v-input-${useId()}`);

const emit = defineEmits<{ "update:modelValue": [value: boolean] }>();

const checked = computed({
  get: () => props.modelValue,
  set: (value: boolean) => {
    if (props.disabled) return;
    emit("update:modelValue", value);
  },
});

const checkboxStyle: Record<CheckboxStyle, string> = {
  primary: "border-none bg-primary text-white",
  custom: "border-none bg-green-500",
  icon: "text-red-500",
};
</script>

<template>
  <label
    :class="[
      'flex justify-start items-center gap-2',
      {
        'opacity-50 pointer-events-none': props.disabled,
        'cursor-pointer': !props.disabled
      }
    ]"
    :for="inputId"
  >
    <input
      :id="inputId"
      v-model="checked"
      :disabled="props.disabled"
      type="checkbox"
      class="hidden"
    >
    <span
      v-if="!props.icon"
      :class="[`border-2 bg-elevated border-border-default stroke-current w-5 h-5
        flex justify-center shrink-0 items-center`,
               checked ? checkboxStyle[props.variant] : '',
               props.type === 'radio' ? 'rounded-full' : 'rounded-sm',
      ]"
    >
      <VIcon
        v-if="checked"
        type="checked"
        class="w-4 h-4 text-secondary-bg"
      />
    </span>
    <VIcon
      v-else
      :type="props.icon"
      :fill="checked ? 'currentColor' : 'none'"
      :class="checked ? checkboxStyle[props.variant] : ''"
    />
    <div
      v-if="props.text"
      class="relative flex gap-2 text-ui-btn text-txt-primary"
    >
      <slot>{{ props.text }}</slot>
    </div>
  </label>
</template>
