<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import "vue-sonner/style.css";
import { Toaster } from "vue-sonner";

import AuthLayout from "@/app/layouts/AuthLayout.vue";
import DefaultLayout from "@/app/layouts/DefaultLayout.vue";
// import Header from "@/widgets/Header/Header.vue";

const route = useRoute();

const layouts = {
  auth: AuthLayout,
  default: DefaultLayout,
};

const routePath = computed(() => {
  const layoutKey = (route.meta.layout || "default") as keyof typeof layouts;

  return layouts[layoutKey];
});
</script>

<template>
  <div class="relative flex flex-col w-full min-h-screen bg-primary">
    <!-- <Header /> -->
    <Toaster />
    <component :is="routePath" />
  </div>
</template>
