<script setup lang="ts">
const { title } = defineProps<{ title: string; }>();
</script>

<template>
  <h2 class="text-head-primary  text-txt-primary">
    {{ title }}
  </h2>
</template>
