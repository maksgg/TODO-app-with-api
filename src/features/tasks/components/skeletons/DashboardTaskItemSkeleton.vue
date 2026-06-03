<script setup lang="ts">
import { VSkeleton } from "@/shared/ui/index";
</script>

<template>
  <div class="flex flex-col gap-3 h-21.25">
    <div class="flex justify-between">
      <VSkeleton
        width="200"
        height="20"
      />
      <VSkeleton
        width="100"
        height="20"
      />
    </div>
    <div class="flex items-center gap-4">
      <VSkeleton
        width="150"
        height="15"
      />
    </div>
    <VSkeleton
      width="250"
      height="20"
    />
  </div>
</template>
