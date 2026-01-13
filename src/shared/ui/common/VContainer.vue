<script setup lang="ts">
type BoxStyle = "form" | "card" | "custom";

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
  form: "text-white gap-10 p-5 rounded-lg bg-blur",
  card: "flex flex-col text-text-color gap-5 p-5 bg-primary rounded-2xl shadow-soft",
  custom: "flex flex-wrap-reverse",
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
      class="flex flex-col justify-between"
    >
      <slot name="header">
        {{ title }}
      </slot>
    </div>
    <div
      v-if="$slots.default"
      class="flex flex-col justify-between"
    >
      <slot name="default" />
    </div>
    <div
      v-if="$slots.footer"
      class="flex flex-col justify-between"
    >
      <slot name="footer" />
    </div>
  </component>
</template>
