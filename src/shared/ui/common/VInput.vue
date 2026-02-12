<script setup lang="ts">
import { ref, computed, useId } from "vue";
import type { Ref } from "vue";

import VIcon from "./VIcon.vue";
import VLoader from "./VLoader.vue";

type VariantStyles = "main" | "toolbar";

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
  disabled?: boolean;
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
  disabled: false,
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
    py-3 pl-4 pr-10 text-bodyL text-txtPrimary bg-secondaryBg border-2 hover:border-borderHover 
    rounded-lg placeholder-muted placeholder:disabled:text-disabledBorder disabled:text-disabledBorder
    disabled:border-disabledBorder disabled:cursor-not-allowed focus:shadow-innerOutline
  `,
  toolbar: `
   max-w-[30rem] py-3 pl-10 pr-10 text-bodyL text-txtPrimary bg-secondaryBg border-2 hover:border-borderHover rounded-2xl 
    placeholder-muted disabled:border-disabledBorder disabled:cursor-not-allowed focus:shadow-innerOutline
  `,
};
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <label
      v-if="props.label"
      :for="inputId"
      :class="['text-uiLabel disabled:text-disabledBorder',
               props.disabled ? 'text-disabledBorder' : '',
               props.validation.$error ?
                 'text-dangerous' : 'text-secondary']"
    >
      <slot name="label">
        {{ props.label }}
      </slot>
    </label>
    <div class="flex relative">
      <div
        v-if="$slots['icon-left'] || props.icon || props.loader"
        class="absolute left-4 bottom-4 flex justify-center items-center text-muted"
      >
        <slot name="icon-left">
          <VLoader v-if="props.loader" />
          <VIcon
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
                   'border-dangerous focus:shadow-none' :
                   'border-borderDefault']"
        :type="inputType"
        :disabled="props.disabled"
        :value="props.modelValue"
        @input="updateModelValue"
      >
      <button
        v-if="props.type === 'password'"
        type="button"
        class="absolute right-4 bottom-3.5 flex pl-2 cursor-pointer text-muted"
        :disabled="props.disabled"
        @click="togglePasswordIcon"
      >
        <VIcon :type="isPasswordType ? 'eyeOff' : 'eye'" />
      </button>
    </div>
    <div
      v-if="validation?.$error"
      class="flex"
    >
      <slot
        name="errorMsg"
        :message="validation?.$errors[0]?.$message"
      >
        <span class="text-dangerousErrMsg text-uiCaption">
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
