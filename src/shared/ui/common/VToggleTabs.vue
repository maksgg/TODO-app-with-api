<script setup lang="ts">
type ToggleTabs = {
  options: { id: string; label: string }[];
  variant?: "primary";
};

const {
  options,
  variant = "primary",
} = defineProps<ToggleTabs>();

const model = defineModel<string>();

const tabsStyle: Record<ToggleTabs["variant"], string> = {
  primary: `px-4 py-2 rounded-xl border border-primaryBg 
  hover:bg-secondaryBg hover:border-borderHover`,
};
</script>

<template>
  <div
    class="relative flex gap-2 p-1 w-fit bg-primaryBg border border-disabledBorder rounded-2xl
    cursor-pointer select-none text-uiLabel text-secondary"
  >
    <button
      v-for="option in options"
      :key="option.id"
      type="button"
      :class="[
        model === option.id ?
          'text-txtPrimary bg-elevated border-2 border-borderHover shadow-activeTab' :
          'text-txtSecondary hover:border',
        tabsStyle[variant]
      ]"
      @click="model = option.id"
    >
      {{ option.label }}
    </button>
  </div>
</template>
