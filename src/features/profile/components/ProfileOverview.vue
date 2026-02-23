<script setup lang="ts">
import ProfileOverviewSkeleton from "./ProfileOverviewSkeleton.vue";

import { UserInfo } from "@/shared/types";
import VTitle from "@/shared/ui/common/VTitle.vue";
import { formatDate } from "@/shared/utils/index";

const { userData, title, loader = false } = defineProps<{
  userData: UserInfo | null;
  title?: string;
  loader: boolean;
}>();
</script>

<template>
  <ProfileOverviewSkeleton v-if="loader" />
  <div
    v-else
    class="flex flex-col gap-6"
  >
    <slot>
      <VTitle :title="title" />
    </slot>
    <div
      class="flex items-center gap-5 border border-borderDefault
    bg-secondaryBg rounded-lg p-6 max-h-[5.5rem]"
    >
      <div class="flex flex-col gap-2">
        <span class="text-displayName text-txtPrimary">{{ userData?.name }}</span>
        <span class="text-bodyM text-secondary">{{ userData?.email }}</span>
      </div>
      <div class="self-start ml-auto text-uiCaption text-secondary">
        <span>Member Since {{ formatDate(userData?.createdAt, "short") }}</span>
      </div>
    </div>
  </div>
</template>
