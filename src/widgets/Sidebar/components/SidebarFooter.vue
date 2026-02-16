<script setup lang="ts">
import ThemeToggle from "@/features/theme/components/ThemeToggle.vue";
import VButton from "@/shared/ui/common/VButton.vue";

const { isExpanded } = defineProps<{
  isExpanded: boolean;
}>();
const emit = defineEmits<{ "open-modal": [] }>();
const openModal = () => emit("open-modal");
</script>

<template>
  <div class="flex flex-col gap-5 w-full">
    <ThemeToggle
      :variant="isExpanded ? 'switch' : 'button'"
      :class="isExpanded ? 'pl-4' : 'p-0'"
    />
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


