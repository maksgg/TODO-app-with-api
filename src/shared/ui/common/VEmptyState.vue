<script setup lang="ts">
const { title, subTitle } = defineProps<{
  title?: string;
  subTitle?: string;
}>();
</script>

<template>
  <div class="flex flex-col gap-2 justify-center items-center w-full">
    <h4 class="text-headingCard text-txtPrimary">
      {{ title }}
    </h4>
    <span class="text-bodyM text-secondary">
      {{ subTitle }}
    </span>
  </div>
</template>

