<script setup lang="ts">
import { FilterConfig } from "../../../features/lists/types";

import VInput from "@/shared/ui/common/VInput.vue";
import VMultiselect from "@/shared/ui/common/VMultiselect.vue";

type ToolbarProps = {
  filterConfigs?: FilterConfig[];
  isSearchable?: boolean;
};

const { filterConfigs = [], isSearchable = true } = defineProps<ToolbarProps>();

const search = defineModel<string>("search");

const filters = defineModel<Record<string, any>>("filters", { required: true });
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
        placeholder="Search..."
        icon="magnifyingGlass"
      />
    </div>
    <VMultiselect
      v-for="config in filterConfigs"
      :key="config.key"
      v-model:model="filters[config.key]"
      :options="config.options"
      :title="config.label"
    />
  </div>
</template>
