<script setup lang="ts">
import { ref, computed, useId } from "vue";
import type { Ref } from "vue";

import VLoader from "./VLoader.vue";

type VariantStyles = "main" | "table";

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
  main: `
    px-4 py-3 text-text-color bg-primary border border-gray-300 rounded-lg 
    placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed
  `,
  table: `
   max-w-[30rem] py-2 px-5 text-sm text-text-color
          border border-line-color rounded-2xl bg-gray-50
          focus:ring-primary focus:border-blue-500 outline-none transition-all
  `,
};
</script>

<template>
  <div class="flex flex-col gap-1 w-full">
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
        class="absolute right-4 bottom-3 flex pl-2 cursor-pointer bg-primary"
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
