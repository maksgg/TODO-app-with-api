<script setup lang="ts">
import VSkeleton from "@/shared/ui/common/VSkeleton.vue";
</script>

<template>
  <div class="flex flex-col gap-6">
    <VSkeleton
      width="300"
      height="22"
    />
    <div
      class="flex items-center gap-5 border border-border-default
    bg-secondary-bg rounded-lg p-6 max-h-22"
    >
      <div class="flex flex-col gap-2">
        <VSkeleton
          width="200"
          height="20"
        />
        <VSkeleton
          width="250"
          height="15"
        />
      </div>
      <div class="self-start ml-auto">
        <VSkeleton
          width="300"
          height="15"
        />
      </div>
    </div>
  </div>
</template>
