<script setup lang="ts">
import { computed } from "vue";

type SwitchStyle = "primary" | "custom" | "theme";
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

const switchStyle: Record<SwitchStyle, string> = {
  primary: "bg-blue-500",
  custom: "bg-purple-500",
  theme: "bg-gray-500",
};
const toggleSize: Record<ToggleSize, string> = {
  sm: "w-5 h-5",
  md: "w-7 h-7",
  lg: "w-9 h-9",
};
const trackSize: Record<ToggleSize, string> = {
  sm: "w-16 h-4",
  md: "w-18 h-6",
  lg: "w-20 h-7",
};
</script>

<template>
  <label
    :for="props.id"
    class="flex justify-start items-center gap-2 mt-5 relative"
  >
    <input
      :id="props.id"
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
    <div
      :class="['rounded-2xl border relative transition-all', trackSize[props.size],
               checked ? `border-none ${switchStyle[props.variant]}` : 'bg-white']"
    >
      <span
        :class="['flex justify-center items-center', toggleSize[props.size],
                 'rounded-full absolute top-1/2 -translate-y-1/2 transition-all',
                 checked ?
                   'bg-white left-full -translate-x-full' :
                   `${switchStyle[props.variant]} left-[-1px] translate-x-0`
        ]"
      >
        <slot
          name="theme-icon"
          :checked="checked"
        />
      </span>
    </div>
    <div>
      <slot>{{ checked ? "On" : "Off" }}</slot>
    </div>
  </label>
</template>
