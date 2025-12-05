<script setup lang="ts">
import { ref, computed, useId } from "vue";
import type { Ref } from "vue";

import VLoader from "./VLoader.vue";

type VariantStyles = "main" | "custom" | "customPassword";

type ValidationError = {
  $message: string | Ref<string>;
  [key: string]: any;
};

type Validation = {
  $error?: boolean;
  $errors?: ValidationError[];
  $dirty?: boolean;
  $touch?: () => void;
  [key: string]: any;
};

type InputProps = {
  id?: string;
  label?: string;
  type?: string;
  modelValue?: string;
  icon?: string;
  loader?: boolean;
  validation?: Validation;
  supportText?: string;
  variant?: VariantStyles;
};

const props = withDefaults(defineProps<InputProps>(), {
  id: "",
  label: "",
  type: "text",
  modelValue: "",
  icon: "",
  loader: false,
  validation: () => ({ $error: false, message: null }),
  supportText: "",
  variant: "main",
});

const emit = defineEmits<{ "update:modelValue": [value: string] }>();

const updateModelValue = (event: Event) => {
  const target = event.target as HTMLInputElement;

  emit("update:modelValue", target.value);
};

const inputId = computed(() => props.id || `v-input-${useId()}`);

const isShowingPassword = ref<boolean>(props.type === "password");

const isPasswordType = computed((): boolean => isShowingPassword.value);

const inputType = computed((): string => {
  if(isPasswordType.value && isShowingPassword.value) {
    return "password";
  }

  return "text";
});

const togglePasswordIcon = (): boolean => isShowingPassword.value = !isShowingPassword.value;

const inputStylesVariant: Record<VariantStyles, string> = {
  main: "border pl-3 pr-3",
  custom: "border-b pb-3 pl-12 pr-2 text-3xl",
  customPassword: "border-b pb-3 pl-12 pr-8 text-3xl",
};
</script>

<template>
  <div class="flex flex-col gap-1 h-[5rem] w-full">
    <label
      v-if="props.label"
      :for="inputId"
    >
      <slot name="label">
        {{ props.label }}
      </slot>
    </label>
    <div class="flex relative">
      <div
        v-if="$slots['icon-left'] || props.icon || props.loader"
        class="absolute left-1 bottom-3 flex justify-center items-center"
      >
        <slot name="icon-left">
          <VLoader v-if="props.loader" />
          <VueFeather
            v-else
            :type="props.icon"
          />
        </slot>
      </div>
      <input
        :id="inputId"
        v-bind="$attrs"
        :class="['w-full outline-none bg-transparent',
                 inputStylesVariant[props.variant],
                 props.validation.$error ?
                   'border-red-500' : 'border-line-color']"
        :type="inputType"
        :value="props.modelValue"
        @input="updateModelValue"
      >
      <button
        v-if="props.type === 'password'"
        type="button"
        class="absolute right-4 bottom-3 flex justify-center items-center cursor-pointer"
        @click="togglePasswordIcon"
      >
        <VueFeather :type="isPasswordType ? 'eye-off' : 'eye'" />
      </button>
    </div>
    <div v-if="validation?.$error">
      <slot
        name="errorMsg"
        :message="validation?.$errors[0]?.$message"
      >
        <span class="text-red-500 text-sm">
          {{ validation?.$errors[0]?.$message }}
        </span>
      </slot>
    </div>
    <div v-else-if="supportText">
      <slot name="sup-text">
        <span class="text-gray-500 text-sm">
          {{ props.supportText }}
        </span>
      </slot>
    </div>
  </div>
</template>
