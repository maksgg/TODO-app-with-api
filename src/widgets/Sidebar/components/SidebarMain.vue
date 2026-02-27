<script setup lang="ts">
import { useRoute } from "vue-router";

import type { SidebarLink } from "@/shared/types";
import VButton from "@/shared/ui/common/VButton.vue";

const route = useRoute();

const { isExpanded, links } = defineProps<{
  isExpanded: boolean;
  links: SidebarLink[];
}>();
</script>

<template>
  <div class="flex flex-col gap-4">
    <VButton
      v-for="link in links"
      :key="link.title"
      :text="link.title"
      :icon="link.icon"
      :to="link.to"
      :tooltip="link.title"
      :show-text="isExpanded"
      :active="route.path === link.to"
      size="full"
      variant="sidebar"
    />
  </div>
</template>
