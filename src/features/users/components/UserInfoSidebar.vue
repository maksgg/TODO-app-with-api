<script setup lang="ts">
import { computed } from "vue";

import UserInfoSidebarSkeleton from "./UserInfoSidebarSkeleton.vue";

import { UserInfo } from "@/shared/types";
import VAvatar from "@/shared/ui/common/VAvatar.vue";
import VContainer from "@/shared/ui/common/VContainer.vue";
import { formatDate } from "@/shared/utils/index";

const { loader, userData } = defineProps<{
  userData: UserInfo | null;
  loader: boolean;
}>();

const userInfoList = computed(() => [
  { label: "Name:", value: userData?.name },
  { label: "Email:", value: userData?.email },
  { label: "Created:", value: formatDate(userData?.createdAt, "long") },
  { label: "Role:", value: userData?.role },
]);
</script>

<template>
  <UserInfoSidebarSkeleton v-if="loader" />
  <VContainer v-else>
    <template #header>
      <VAvatar
        :name="userData?.name"
        size="lg"
      />
    </template>
    <template #default>
      <div
        v-for="userInfo in userInfoList"
        :key="userInfo.label"
        class="flex gap-2 text-text-color"
      >
        <strong>
          {{ userInfo.label }}
        </strong>
        <span>
          {{ userInfo.value }}
        </span>
      </div>
    </template>
  </VContainer>
</template>

