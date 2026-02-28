<script setup lang="ts">
const { title = "" } = defineProps<{ title: string; }>();
</script>

<template>
  <h2 class="text-headPrimary text-txtPrimary">
    {{ title }}
  </h2>
</template>
