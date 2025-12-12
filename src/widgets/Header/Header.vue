<script setup lang="ts">
import ThemeToggle from "@/features/theme/components/ThemeToggle.vue";
</script>

<template>
  <header class="relative w-full min-h-[11vh]">
    <div
      class="absolute inset-0 bg-primary
             [mask-image:linear-gradient(to_bottom,black_30%,transparent_100%)]"
    />
    <div
      class="relative z-10 flex justify-between items-center pl-10 pr-10 gap-5 h-full min-h-[11vh]"
    >
      <div class="flex justify-center items-center text-text-color border border-bg-color">
        Logo
      </div>
      <div>
        <VDropDown />
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>
