<script setup lang="ts">
import "vue-sonner/style.css";
import { Toaster } from "vue-sonner";

import VIcon from "@/shared/ui/common/VIcon.vue";

const { theme } = defineProps<{ theme: "light" | "dark" }>();
</script>

<template>
  <Toaster
    position="top-right"
    :theme="theme"
    :rich-colors="false"
  >
    <template #success-icon>
      <VIcon
        type="checked"
        class="text-success"
      />
    </template>
    <template #error-icon>
      <VIcon
        type="x"
        class="text-dangerous"
      />
    </template>
  </Toaster>
</template>

<style scoped>
@reference "../../../app/main.css";

:deep([data-sonner-toast]) {
  @apply bg-secondary-bg text-txt-primary
    border border-border-default rounded-xl;
}
</style>
