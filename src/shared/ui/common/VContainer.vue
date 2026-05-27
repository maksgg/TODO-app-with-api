<script setup lang="ts">
type BoxStyle = "weekly" | "card" | "custom";

type ContainerProps = {
  title?: string;
  as?: "form" | "div";
  variant?: BoxStyle;
};

const {
  title = "",
  as = "div",
  variant = "card",
} = defineProps<ContainerProps>();

const styleVariants: Record<BoxStyle, string> = {
  weekly: "flex flex-col p-4 bg-primary-bg rounded-xl border border-list-card-border",
  card: "flex flex-col gap-5 p-6 bg-secondary-bg rounded-xl border border-list-card-border",
  custom: "flex flex-col gap-5 p-6 bg-secondary-bg border border-list-card-border",
};
</script>

<template>
  <component
    :is="as"
    :class="styleVariants[variant]"
    v-bind="$attrs"
  >
    <div
      v-if="$slots.header || title"
      class="flex justify-between"
    >
      <slot name="header">
        {{ title }}
      </slot>
    </div>
    <div class="flex flex-col flex-1">
      <slot />
    </div>
    <div
      v-if="$slots.footer"
      class="relative flex justify-between"
    >
      <slot name="footer" />
    </div>
  </component>
</template>
