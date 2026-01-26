<script setup lang="ts">
import { UserInfo } from "@/shared/types";
import { formatDate } from "@/shared/utils/index";

const { userData } = defineProps<{
  userData: UserInfo | null;
}>();
</script>

<template>
  <h2 class="text-3xl font-bold">
    Profile Overview
  </h2>
  <div class="flex flex-1 items-center gap-5 border rounded-lg p-6 max-h-[7.5rem]">
    <div class="flex flex-col gap-2">
      <span class="text-xl font-bold">{{ userData?.name }}</span>
      <span>{{ userData?.email }}</span>
    </div>
    <div class="self-start ml-auto text-[12px]">
      <span>Member Since {{ formatDate(userData?.createdAt, "short") }}</span>
    </div>
  </div>
</template>

