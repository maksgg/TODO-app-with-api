<script setup lang="ts">
import { useLanguages } from "@/features/i18n/composables/useI18n";
import VDropDown from "@/shared/ui/common/VDropDown.vue";

const { locale, languages } = useLanguages();
</script>

<template>
  <VDropDown
    v-model="locale"
    title="EN"
    :items="languages"
    variant="languages"
  />
</template>
