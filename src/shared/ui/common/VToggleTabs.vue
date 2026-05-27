<script setup lang="ts">
type ToggleTabs = {
  options: { id: string; label: string }[];
  variant?: "primary";
};

const { options, variant = "primary" } = defineProps<ToggleTabs>();

const model = defineModel<string>();

const tabsStyle: Record<ToggleTabs["variant"], string> = {
  primary: `px-4 py-2 rounded-xl border border-primary-bg
  hover:bg-secondary-bg hover:border-border-hover`,
};
</script>

<template>
  <div
    class="relative z-100 flex gap-2 p-1 w-fit bg-primary-bg
    border border-disabled-border rounded-2xl
    select-none text-ui-label text-secondary"
  >
    <button
      v-for="option in options"
      :key="option.id"
      type="button"
      :class="[
        'cursor-pointer',
        model === option.id
          ? 'text-txt-primary bg-elevated border-2 border-border-hover! shadow-active-tab'
          : 'hover:border-border-hover',
        tabsStyle[variant],
      ]"
      @click="model = option.id"
    >
      {{ option.label }}
    </button>
  </div>
</template>
