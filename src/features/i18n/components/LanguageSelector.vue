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
      class="w-[5rem]"
    />
    <VDropDown
      v-if="variant === 'button'"
      v-model="locale"
      :options="languages.options"
      placement="topLeft"
    >
      <template #trigger>
        <div
          class="overflow-hidden flex justify-center items-center
         w-[26px] h-[26px] shadow-sm border border-themeSwitchBorder rounded-full"
        >
          <VIcon
            :type="`${locale}Flag`"
            class="w-[26px] h-[26px] scale-[1.5]"
          />
        </div>
      </template>
      <template #options="{ item }">
        <VIcon
          :type="`${item.value}Flag`"
          class="w-6 h-6"
        />
      </template>
    </VDropDown>
  </div>
</template>
