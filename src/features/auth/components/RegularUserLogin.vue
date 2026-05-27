<script setup lang="ts">
import VButton from "@/shared/ui/common/VButton.vue";

const { loader } = defineProps<{ loader: boolean; }>();
const emit = defineEmits<{ "submitRegularUser": [void] }>();
const submit = () => emit("submitRegularUser");
</script>

<template>
  <div class="flex items-center w-full gap-4">
    <div class="h-px bg-border-default flex-1" />
    <span class="text-ui-label text-secondary">{{ $t('auth.regularUser.or') }}</span>
    <div class="h-px bg-border-default flex-1" />
  </div>
  <VButton
    :text="$t('auth.regularUser.quick_start')"
    size="full"
    variant="secondary"
    :class="loader ? 'pointer-events-none' : ''"
    @click="submit"
  />
</template>
