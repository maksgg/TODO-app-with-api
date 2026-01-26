<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import "vue-sonner/style.css";
import { Toaster } from "vue-sonner";

import AuthLayout from "@/app/layouts/AuthLayout.vue";
import DefaultLayout from "@/app/layouts/DefaultLayout.vue";

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
  <div
    :class="['relative flex flex-col w-full h-screen overflow-hidden',
             routePath === AuthLayout ?
               'bg-authBg bg-cover bg-center' : 'bg-background'
    ]"
  >
    <Toaster />
    <component :is="routePath" />
  </div>
</template>
