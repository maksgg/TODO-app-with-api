<script setup lang="ts">
const { title, subTitle } = defineProps<{
  title?: string;
  subTitle?: string;
}>();
</script>

<template>
  <div class="flex flex-col gap-2 justify-center items-center w-full">
    <h4 class="text-heading-card text-txt-primary">
      {{ title }}
    </h4>
    <span class="text-body-m text-secondary">
      {{ subTitle }}
    </span>
  </div>
</template>
