<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import "vue-sonner/style.css";
import { Toaster } from "vue-sonner";

import AuthLayout from "@/app/layouts/AuthLayout.vue";
import DefaultLayout from "@/app/layouts/DefaultLayout.vue";
import VBackground from "@/shared/ui/common/VBackground.vue";
import Footer from "@/widgets/Header/Footer.vue";
import Header from "@/widgets/Header/Header.vue";

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
    class="relative flex flex-col justify-between items-center
      w-full min-h-screen bg-primary"
  >
    <VBackground
      :class="['absolute inset-0 z-0 pointer-events-none',
               routePath === layouts.auth ?
                 '[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_100%)]' : '']"
    />
    <Header />
    <Toaster />
    <component :is="routePath" />
    <Footer />
  </div>
</template>
