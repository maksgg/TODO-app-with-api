<script setup lang="ts">
import { ref } from "vue";

import VToggleTabs from "@/shared/ui/common/VToggleTabs.vue";

const activeTab = ref("week");

const tabs = ref([
  { id: "week", label: "Week" },
  { id: "month", label: "Month" },
]);
</script>
<template>
  <Teleport
    to="#header-action"
    defer
  >
    <VToggleTabs
      v-model="activeTab"
      :options="tabs"
    />
  </Teleport>
  <div class="text-3xl text-txtPrimary px-12 py-6">
    Analytics are coming soon...
  </div>
</template>

