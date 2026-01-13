<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";

import VLoader from "./VLoader.vue";

type ButtonStyle = "primary" | "dangerous" | "ghost" | "sidebar";

type ButtonSize = "sm" | "md" | "lg" | "fit" | "full";

type ButtonProps = {
  text?: string;
  showText?: boolean;
  type?: "button" | "submit" | "reset"
  disabled?: boolean;
  loader?: boolean;
  variant?: ButtonStyle;
  size?: ButtonSize;
  to?: string;
  icon?: string;
  iconSize?: string;
  tooltip?: string;
};

const props = withDefaults(defineProps<ButtonProps>(), {
  text: "",
  showText: true,
  type: "button",
  disabled: false,
  loader: false,
  variant: "primary",
  size: "fit",
  to: "",
  icon: "",
  iconSize: "24",
  tooltip: "",
});

const isRouterLink = computed((): boolean => !!props.to);

const baseButtonStyles: string = `
  group relative
  flex justify-center items-center 
  border border-transparent leading-none
  disabled:bg-gray-500 disabled:bg-none disabled:text-gray-300 disabled:cursor-not-allowed
`;

const btnStyleVariants: Record<ButtonStyle, string> = {
  primary: `
    ${baseButtonStyles}
    text-white
    gap-2 p-4 rounded-xl bg-btnBg
    enabled:hover:border-text-color 
    enabled:hover:text-text-color 
    enabled:hover:bg-none
  `,
  dangerous: `
    ${baseButtonStyles}
    text-white
    gap-2 p-4 rounded-xl bg-red-500
    enabled:hover:border-text-color 
    enabled:hover:text-text-color 
    enabled:hover:bg-transparent
  `,
  ghost: `
    border-none text-text-color
    transition-all duration-300
  `,
  sidebar: `group relative flex items-center gap-5 px-1 py-2 w-full border-none 
    overflow-visible transition-all whitespace-nowrap`,
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
      class="flex justify-center items-center"
    >
      <slot name="icon-left">
        <VLoader v-if="props.loader" />
        <VueFeather
          v-else
          :type="props.icon"
          :size="props.iconSize"
        />
      </slot>
    </div>
    <Transition name="sidebar-fade">
      <span
        v-if="showText"
        class="v-button__text"
      >
        <slot>{{ props.text }}</slot>
      </span>
    </Transition>
    <div
      v-if="$slots['icon-right'] && props.icon"
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
/* Анімація появи тексту */
.sidebar-fade-enter-active {
  /* Текст чекає 0.2с, поки розшириться сайдбар */
  transition: all 0.05s ease-out 0.05s;
}

/* Анімація зникнення тексту */
.sidebar-fade-leave-active {
  /* Зникає миттєво, щоб не "вилазити" при звуженні */
  transition: all 0.1s ease-in;
}

.sidebar-fade-enter-from,
.sidebar-fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
  /* Обнуляємо ширину, щоб текст не штовхав сусідні елементи під час зникнення */
  max-width: 0;
}

.v-button__text {
  display: inline-block;
  white-space: nowrap;
  /* Для плавності можна додати max-width */
  max-width: 200px;
}
</style>
