<script setup lang="ts">
import { ref } from "vue";

import { Tabs } from "@/shared/types";
import VHeader from "@/shared/ui/common/VHeader.vue";
import VTabs from "@/shared/ui/common/VTabs.vue";

const tabs = ref<Tabs[]>([
  { id: "Tab 1", label: "Week" },
  { id: "Tab 2",label: "Month" },
]);
</script>
<template>
  <VHeader title="See how your tasks are progressing over time">
    <template #actions>
      <div>
        <VTabs :tabs="tabs" />
      </div>
    </template>
  </VHeader>
  <div class="text-3xl fon-bold px-12 py-6">
    Analytics are coming soon...
  </div>
</template>

