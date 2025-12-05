<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";

import VLoader from "./VLoader.vue";

type ButtonStyle = "primary" | "secondary" | "link";
type ButtonSize = "sm" | "md" | "lg" | "fit" | "full";

export type ButtonProps = {
  text?: string;
  type?: "button" | "submit" | "reset"
  disabled?: boolean;
  loader?: boolean;
  variant?: ButtonStyle;
  size?: ButtonSize;
  to?: string;
  icon?: string;
};
const props = withDefaults(defineProps<ButtonProps>(), {
  text: "",
  type: "button",
  disabled: false,
  loader: false,
  variant: "primary",
  size: "sm",
  to: "",
  icon: "",
});

const isRouterLink = computed((): boolean => !!props.to);

const baseButtonStyles: string = `
  flex justify-center items-center 
  transition-all duration-150 ease-in 
  border border-transparent
  disabled:bg-gray-400 disabled:text-gray-700 disabled:border-gray-400 disabled:cursor-not-allowed
`;

const btnStyleVariants: Record<ButtonStyle, string> = {
  primary: `
    ${baseButtonStyles}
    text-white
    gap-2 p-5 rounded-3xl bg-gradient-to-r from-gradient-from to-gradient-to
    hover:bg-none hover:border-text-color hover:text-text-color
  `,
  secondary: `
    ${baseButtonStyles}
    bg-red-500 text-white
    gap-2 p-3 rounded-md
    hover:bg-red-600
  `,
  link: "border-primary text-color p-0 hover:opacity-80 transition-opacity",
};

const btnSize: Record<ButtonSize, string> = {
  sm: "w-24",
  md: "w-32",
  lg: "w-40",
  fit: "w-fit",
  full: "w-full",
};
</script>

<template>
  <component
    :is="isRouterLink ? RouterLink : 'button'"
    v-bind="
      isRouterLink
        ? {
          to: props.to,
          ...$attrs,
        }
        : { type: props.type, disabled: props.disabled || props.loader, ...$attrs }
    "
    :class="[btnStyleVariants[props.variant], btnSize[props.size]]"
  >
    <div
      v-if="$slots['icon-left'] || props.icon || props.loader"
      class="flex justify-center items-center"
    >
      <slot name="icon-left">
        <VLoader v-if="props.loader" />
        <VueFeather
          v-else
          :type="props.icon"
        />
      </slot>
    </div>
    <slot>{{ props.text }}</slot>
    <div
      v-if="props.icon"
      class="flex"
    >
      <slot name="icon-right" />
    </div>
  </component>
</template>
