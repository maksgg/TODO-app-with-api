<script setup lang="ts">
import { computed, useId } from "vue";

type CheckboxStyle = "primary" | "custom" | "icon";

type CheckboxProps = {
  id?: string;
  text?: string;
  modelValue?: boolean;
  disabled?: boolean;
  icon?: string;
  variant?: CheckboxStyle;
};

const props = withDefaults(defineProps<CheckboxProps>(), {
  id: "",
  text: "",
  modelValue: false,
  disabled: false,
  icon: "",
  variant: "primary",
});

const inputId = computed(() => props.id || `v-input-${useId()}`);

const emit = defineEmits<{ "update:modelValue": [value: boolean] }>();

const checked = computed({
  get () {
    return props.modelValue;
  },
  set (value: boolean) {
    if(props.disabled) {
      return;
    }
    emit("update:modelValue", value);
  },
});

const checkboxStyle: Record<CheckboxStyle, string> = {
  primary: "border-none bg-blue-500 text-white",
  custom: "border-none bg-green-500",
  icon: "text-red-500",
};
</script>

<template>
  <label
    :class="['flex justify-start items-center gap-2',
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
      :class="[`border stroke-current rounded-sm w-4 h-4
       flex justify-center items-center z-10`,
               checked ? checkboxStyle[props.variant] : '' ]"
    >
      <VueFeather
        v-if="checked"
        type="check"
        class="w-4 h-4"
      />
    </span>
    <VueFeather
      v-else
      :type="props.icon"
      :fill="checked ? 'currentColor' : 'none'"
      :class="checked ? checkboxStyle[props.variant] : ''"
    />
    <div>
      <slot>{{ props.text }}</slot>
    </div>
  </label>
</template>
