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
:deep([data-sonner-toast]) {
  @apply bg-secondaryBg text-txtPrimary border border-borderDefault rounded-xl
}
</style>
