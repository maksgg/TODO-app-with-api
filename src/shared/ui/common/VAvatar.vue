<script setup lang="ts">
import { getInitials, getAvatarColor } from "@/shared/utils/index";

type AvatarProps = {
  name?: string;
  size?: "sm" | "md" | "lg";
};

const { name, size = "sm" } = defineProps<AvatarProps>();

const avatarSize: Record<AvatarProps["size"], string> = {
  sm: "w-[2rem] h-[2rem]",
  md: "w-[4.5rem] h-[4.5rem]",
  lg: "w-[10rem] h-[10rem]",
};
const textSize: Record<AvatarProps["size"], string> = {
  sm: "text-[10px]",
  md: "text-lg",
  lg: "text-xl",
};
</script>

<template>
  <span
    class="flex justify-center items-center
    rounded-full text-text-color"
    v-bind="$attrs"
    :class="[getAvatarColor(name || 'Guest'), avatarSize[size], textSize[size]]"
  >
    {{ getInitials(name) }}
  </span>
</template>

