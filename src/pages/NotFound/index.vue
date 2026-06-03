<script setup lang="ts">
import { VNotFoundBackground } from "@/shared/ui/index";
</script>

<template>
  <div
    class="flex flex-col justify-center items-center gap-6
  bg-primaryBg min-h-screen"
  >
    <VNotFoundBackground />
    <h1 class="text-headPrimary text-txtPrimary">
      {{ $t("notFound.page_not_found") }}
    </h1>
    <p class="text-uiHead text-txtPrimary">
      {{ $t("notFound.sub_text") }}
    </p>
    <router-link
      to="/"
      class="text-uiBtn text-primary hover:scale-110 transition-all"
    >
      {{ $t("notFound.back_to_dashboard") }}
    </router-link>
  </div>
</template>
