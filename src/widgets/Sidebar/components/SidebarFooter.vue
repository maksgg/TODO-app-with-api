<script setup lang="ts">
import LanguageSelector from "@/features/i18n/components/LanguageSelector.vue";
import ThemeToggle from "@/features/theme/components/ThemeToggle.vue";
import VButton from "@/shared/ui/common/VButton.vue";

const { isExpanded, showCustomizers= false } = defineProps<{
  isExpanded: boolean;
  showCustomizers: boolean;
}>();
const emit = defineEmits<{ "open-modal": [] }>();
const openModal = () => emit("open-modal");
</script>

<template>
  <div class="flex flex-col gap-5 w-full">
    <div :class="['flex gap-2', isExpanded ? 'flex-row-reverse' : 'flex-col']">
      <LanguageSelector
        v-if="!showCustomizers"
        variant="button"
        :class="['flex-1', isExpanded ? '' : 'flex justify-center']"
      />
      <ThemeToggle
        v-if="!showCustomizers"
        :variant="isExpanded ? 'switch' : 'button'"
        :class="isExpanded ? 'pl-4' : 'p-0'"
      />
    </div>
    <VButton
      text="Log out"
      :show-text="isExpanded"
      icon="logOut"
      size="full"
      variant="sidebar"
      tooltip="Log out"
      @click="openModal"
    />
  </div>
</template>
