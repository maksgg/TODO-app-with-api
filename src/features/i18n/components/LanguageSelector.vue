<script setup lang="ts">
import { computed } from "vue";

import { useLanguages } from "@/features/i18n/composables/useI18n";
import VMultiselect from "@/shared/ui/common/VMultiselect.vue";

const { locale, languages } = useLanguages();
const selectedLangObject = computed({
  get: () => languages.options.find((el) => el.value === locale.value),
  set: (newVal) => {
    if (newVal) locale.value = newVal.value;
  },
});
</script>

<template>
  <VMultiselect
    v-model:model="selectedLangObject"
    :options="languages.options"
    :title="languages.label"
    size="sm"
  />
</template>
