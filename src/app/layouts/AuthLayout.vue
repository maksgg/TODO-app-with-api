<script setup lang="ts">
import VBackground from "@/shared/ui/common/VBackground.vue";
</script>

<template>
  <div
    class="relative flex flex-col-reverse justify-center items-center
    w-full min-h-screen bg-primary"
  >
    <VBackground
      class="absolute inset-0 z-0 pointer-events-none
             [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black_100%)]"
    />
    <div class="relative z-10 w-full flex flex-col-reverse justify-center items-center">
      <RouterView />
      <slot />
    </div>
  </div>
</template>
