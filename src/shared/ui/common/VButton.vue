<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";

import VIcon from "./VIcon.vue";
import VLoader from "./VLoader.vue";

type ButtonStyle = "primary" | "dangerous" | "ghost" | "sidebar" | "secondary";

type ButtonSize = "sm" | "md" | "lg" | "fit" | "full";

type ButtonProps = {
  text?: string;
  showText?: boolean;
  isOpen?: boolean | null;
  type?: "button" | "submit" | "reset"
  disabled?: boolean;
  loader?: boolean;
  variant?: ButtonStyle;
  size?: ButtonSize;
  to?: string;
  icon?: string;
  iconSize?: "sm" | "md" | "lg";
  tooltip?: string;
};

const props = withDefaults(defineProps<ButtonProps>(), {
  text: "",
  showText: true,
  isOpen: null,
  type: "button",
  disabled: false,
  loader: false,
  variant: "primary",
  size: "fit",
  to: "",
  icon: "",
  iconSize: "md",
  tooltip: "",
});

const isRouterLink = computed((): boolean => !!props.to);

const baseButtonStyles: string = `
  group relative flex justify-center items-center text-uiBtn text-secondaryBgLight
  disabled:border-disabledBtn disabled:bg-disabledBtn disabled:text-txtMutedLight 
  disabled:drop-shadow-none disabled:cursor-not-allowed
`;
const iconTransform = computed(() => {
  if (props.variant !== "sidebar") return "";
  return !props.showText ? "translateX(-8px)" : "translateX(0)";
});

const btnStyleVariants: Record<ButtonStyle, string> = {
  primary: `
    ${baseButtonStyles}
    border border-primary
    hover:bg-activePrimary
    hover:border-activePrimary
    active:bg-activePrimary
    active:drop-shadow-none
    gap-2 px-4 py-3 rounded-xl bg-primary
    enabled:hover:border-text-primary 
  `,
  dangerous: `
    ${baseButtonStyles}
    border border-dangerous
    hover:bg-activeDangerous
    hover:border-activeDangerous
    active:bg-activeDangerous
    active:drop-shadow-none
    gap-2 px-4 py-3 rounded-xl bg-dangerous
    enabled:hover:border-text-primary 
  `,
  secondary: `
    ${baseButtonStyles}
    bg-white/5
    backdrop-blur-md
    border border-white/10
    text-white/80
    hover:bg-white/10
    hover:text-white
    hover:border-white/20
    gap-2 px-4 py-3 rounded-xl
    transition-all duration-300
  `,
  ghost: `
    group flex items-center gap-2 border-none text-bodyL text-start truncate
    transition-all duration-300 disabled:text-txtMutedLight 
    disabled:drop-shadow-none disabled:cursor-not-allowed disabled:pointer-events-none
  `,
  sidebar: `group relative flex items-center gap-2 px-4 py-3 w-full border-none 
    whitespace-nowrap text-txtSecondaryDark text-uiBtn hover:rounded-lg leading-none
    [&.router-link-active]:bg-secondaryBgDark
    [&.router-link-active]:text-txtPrimaryDark
    [&.router-link-active]:rounded-lg
    [&.router-link-active]:shadow-sidebarActive
    hover:bg-sidebarHoverBtn
    hover:text-white
  `,
};

const btnSize: Record<ButtonSize, string> = {
  sm: "w-10",
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
      :class="['flex justify-center items-center']"
      :style="{
        transform: iconTransform,
        transition: 'transform 0.1s cubic-bezier(0.4, 0, 0.2, 1)'
      }"
    >
      <slot name="icon-left">
        <VLoader v-if="props.loader" />
        <VIcon
          v-else
          :type="props.icon"
          :size="props.iconSize"
          :class="{ 'text-btnBg' : isOpen}"
        />
      </slot>
    </div>
    <Transition name="sidebar-fade">
      <span
        v-if="showText"
        :class="['v-button__text',
                 props.variant === 'ghost' ? 'truncate w-full' : '' ]"
      >
        <slot>{{ props.text }}</slot>
      </span>
    </Transition>
    <div
      v-if="$slots['icon-right']"
      class="flex"
    >
      <slot name="icon-right" />
    </div>
    <span
      v-if="props.tooltip && !showText"
      class="
        pointer-events-none absolute bottom-full left-[85%] -translate-x-1/4 mb-1
        z-[100] whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white shadow-lg
        opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100
      "
    >
      {{ props.tooltip }}
    </span>
  </component>
</template>

<style scoped>
.v-button__text {
  display: inline-block;
  white-space: nowrap;
}
</style>
