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
  card: "flex flex-col gap-5 p-6 bg-secondaryBg rounded-xl border border-listCardBorder",
  custom: "flex flex-wrap",
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
    <div
      v-if="$slots.main"
      class="flex flex-col justify-between"
    >
      <slot name="main" />
    </div>
    <div
      v-if="$slots.footer"
      class="relative flex justify-between"
    >
      <slot name="footer" />
    </div>
  </component>
</template>
