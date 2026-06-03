<script setup lang="ts">
import { ProfileOverviewSkeleton } from "@/features/profile/components/index";
import type { UserInfo } from "@/shared/types";
import { VTitle } from "@/shared/ui/index";
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
      class="flex items-center gap-5 border border-border-default
    bg-secondary-bg rounded-lg p-6 max-h-22"
    >
      <div class="flex flex-col gap-2">
        <span class="text-display-name text-txt-primary">{{ userData?.name }}</span>
        <span class="text-body-m  text-secondary">{{ userData?.email }}</span>
      </div>
      <div class="self-start ml-auto text-ui-caption text-secondary">
        <span>
          {{
            `${$t('profile.member_since')}
            ${formatDate(userData?.createdAt, "short", $i18n.locale)}`
          }}
        </span>
      </div>
    </div>
  </div>
</template>
