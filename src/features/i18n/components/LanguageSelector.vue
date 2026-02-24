<script setup lang="ts">
import { computed } from "vue";

import { useLanguages } from "@/features/i18n/composables/useI18n";
import VDropDown from "@/shared/ui/common/VDropDown.vue";
import VIcon from "@/shared/ui/common/VIcon.vue";
import VMultiselect from "@/shared/ui/common/VMultiselect.vue";

const { variant = "select" } = defineProps<{ variant: "select" | "button" }>();

const { locale, languages } = useLanguages();
const selectedLangObject = computed({
  get: () => languages.options.find((el) => el.value === locale.value),
  set: (newVal) => {
    if (newVal) locale.value = newVal.value;
  },
});
</script>

<template>
  <div class="language-selector-wrapper">
    <VMultiselect
      v-if="variant === 'select'"
      v-model:model="selectedLangObject"
      :options="languages.options"
      :title="languages.label"
      class="w-[5rem]"
    />
    <VDropDown
      v-if="variant === 'button'"
      v-model="locale"
      :options="languages.options"
      variant="custom"
      placement="topLeft"
    >
      <template #trigger>
        <VIcon
          v-if="locale === 'ua'"
          type="uaFlag"
          class="w-6 h-6"
        />
        <VIcon
          v-if="locale === 'en'"
          type="ukFlag"
          class="w-6 h-6"
        />
      </template>
      <template #options="{ item }">
        <VIcon
          v-if="item.value === 'ua'"
          type="uaFlag"
          class="w-6 h-6"
        />
        <VIcon
          v-if="item.value === 'en'"
          type="ukFlag"
          class="w-6 h-6"
        />
      </template>
    </VDropDown>
  </div>
</template>
