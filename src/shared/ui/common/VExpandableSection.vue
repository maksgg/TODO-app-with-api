<script setup lang="ts">
import { computed } from "vue";

import VSkeleton from "./VSkeleton.vue";

import VButton from "@/shared/ui/common/VButton.vue";

const { title, loader, sectionId } = defineProps<{
  title?: string;
  loader?: boolean;
  sectionId?: string;
}>();

const activeId = defineModel<string | null>();

const isExpanded = computed(() => activeId.value === sectionId);

const toggle = () => activeId.value = isExpanded.value ? null : sectionId;
</script>

<template>
  <div class="flex flex-col">
    <VSkeleton
      v-if="loader"
      width="120"
      height="24"
    />
    <div
      v-else
      class="flex gap-2 px-4 py-1 items-center cursor-pointer"
      @click="toggle"
    >
      <slot
        name="title"
        :is-expanded="isExpanded"
      >
        <span class="text-body-l text-txt-primary">
          {{ title }}
        </span>
        <VButton
          icon="chevronUp"
          variant="ghost"
          :show-text="false"
          :class="[
            'transition-transform text-secondary', isExpanded ? '' : 'rotate-180']"
        />
      </slot>
    </div>
    <div
      class="grid transition-[grid-template-rows] overflow-auto no-scrollbar max-h-[28vh]"
      :class="isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
    >
      <div class="overflow-auto no-scrollbar">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none; /* Для Chrome, Safari та Opera */
}

.no-scrollbar {
  -ms-overflow-style: none;  /* Для Internet Explorer та Edge */
  scrollbar-width: none;  /* Для Firefox */
}
</style>
