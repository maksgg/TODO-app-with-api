<script setup lang="ts">
import Header from "@/widgets/Header/Header.vue";
</script>

<template>
  <Header />
  <main class="relative flex flex-1 justify-center items-center w-full">
    <RouterView />
  </main>
</template>
