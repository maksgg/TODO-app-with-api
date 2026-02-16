<script setup lang="ts">
import { FilterConfig } from "@/shared/types";
import VInput from "@/shared/ui/common/VInput.vue";
import VMultiselect from "@/shared/ui/common/VMultiselect.vue";

type ToolbarProps = {
  filterConfigs?: FilterConfig;
  isSearchable?: boolean;
  disabled?: boolean;
  selectWidth?: "sm" | "md" | "lg";
};

const {
  filterConfigs = [],
  isSearchable = true,
  disabled = false,
  selectWidth = "sm",
} = defineProps<ToolbarProps>();

const search = defineModel<string>("search");

const filters = defineModel<Record<string, any>>("filters", { required: true });

const size: Record<ToolbarProps["selectWidth"], string> = {
  sm: "w-[10rem]",
  md: "w-[15rem]",
  lg: "w-[20rem]",
};
</script>

<template>
  <div class="flex items-center gap-6">
    <div
      v-if="isSearchable"
      class="w-[20rem]"
    >
      <VInput
        v-model="search"
        variant="toolbar"
        :disabled="disabled"
        placeholder="Search..."
        icon="magnifyingGlass"
      />
    </div>
    <VMultiselect
      v-for="config in filterConfigs"
      :key="config.key"
      v-model:model="filters[config.key]"
      :options="config.options"
      :disabled="disabled"
      :title="config.label"
      :class="size[selectWidth]"
    />
  </div>
</template>
