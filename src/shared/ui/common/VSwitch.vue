<script setup lang="ts">
import { computed, useId } from "vue";

type SwitchStyle = "primary" | "default" | "custom";
type ToggleSize = "sm" | "md" | "lg";

type SwitchProps = {
  id?: string;
  text?: string
  modelValue?: boolean;
  disabled?: boolean;
  variant?: SwitchStyle;
  size?: ToggleSize;
};
const props = withDefaults(defineProps<SwitchProps>(),{
  id: "",
  text: "",
  modelValue: false,
  disabled: false,
  variant: "primary",
  size: "md",
});
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

const id = computed(() => props.id || useId());

const switchStyle: Record<string, string> = {
  primary: "bg-blue-500",
  default: "bg-switch-bg",
};

const toggleSize: Record<ToggleSize, string> = {
  sm: "w-[16.5px] h-[16.5px]",
  md: "w-7 h-7",
  lg: "w-9 h-9",
};
const trackSize: Record<ToggleSize, string> = {
  sm: "w-10 h-5",
  md: "w-14 h-7",
  lg: "w-20 h-7",
};
</script>

<template>
  <label
    :for="id"
    class="flex justify-start items-center gap-2 relative w-full"
  >
    <input
      :id="id"
      v-model="checked"
      :disabled="props.disabled"
      type="checkbox"
      :class="['absolute opacity-0 z-10 cursor-pointer', trackSize[props.size],
               {
                 'pointer-events-none': props.disabled,
                 'cursor-pointer': !props.disabled
               }
      ]"
    >
    <slot
      v-if="props.variant === 'custom'"
      name="custom-switch"
      :checked="checked"
      :disabled="disabled"
    />
    <div
      v-else
      :class="['rounded-2xl border relative transition-all',
               trackSize[props.size], { 'opacity-50': props.disabled },
               checked ?
                 `border-none ${switchStyle[props.variant]}` :
                 'bg-white border-gray-200 shadow-inner'
      ]"
    >
      <span
        :class="['flex justify-center items-center', toggleSize[props.size],
                 'rounded-full absolute top-1/2 -translate-y-1/2 transition-all',
                 checked ?
                   `bg-white left-[calc(100%-3px)] -translate-x-full
                   shadow-[0_0_1px_rgba(0,0,0,0.3)]` :
                   `${switchStyle[props.variant]} left-[3px] translate-x-0`
        ]"
      >
        <slot
          name="theme-icon"
          :checked="checked"
        />
      </span>
    </div>
    <div
      v-if="props.text"
      class="text-text-color"
    >
      <slot>{{ props.text }}</slot>
    </div>
  </label>
</template>
