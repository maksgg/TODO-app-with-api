<script setup lang="ts">
import { VButton } from "@/shared/ui/index";

const { isExpanded } = defineProps<{
  isExpanded: boolean;
  showCustomizers: boolean;
}>();
const emit = defineEmits<{ "open-modal": [] }>();
const openModal = () => emit("open-modal");
</script>

<template>
  <div class="flex flex-col gap-5 w-full">
    <VButton
      :text="$t('sidebar.btn.log_out')"
      :show-text="isExpanded"
      icon="logOut"
      size="full"
      variant="sidebar"
      tooltip="Log out"
      @click="openModal"
    />
  </div>
</template>
