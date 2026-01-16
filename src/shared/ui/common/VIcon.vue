<script setup lang="ts">
import { type Component } from "vue";

import Analytic from "@/shared/ui/icons/Analytic.vue";
import ChevronDown from "@/shared/ui/icons/ChevronDown.vue";
import ChevronLeft from "@/shared/ui/icons/ChevronLeft.vue";
import ChevronRight from "@/shared/ui/icons/ChevronRight.vue";
import ChevronUp from "@/shared/ui/icons/ChevronUp.vue";
import Close from "@/shared/ui/icons/Close.vue";
import Eye from "@/shared/ui/icons/Eye.vue";
import EyeOff from "@/shared/ui/icons/EyeOff.vue";
import Home from "@/shared/ui/icons/Home.vue";
import HorizontalDots from "@/shared/ui/icons/HorizontalDots.vue";
import List from "@/shared/ui/icons/List.vue";
import LogOut from "@/shared/ui/icons/LogOut.vue";
import MagnifyingGlass from "@/shared/ui/icons/MagnifyingGlass.vue";
import Plus from "@/shared/ui/icons/Plus.vue";
import Tool from "@/shared/ui/icons/Tool.vue";
import UserIcon from "@/shared/ui/icons/UserIcon.vue";

const { type } = defineProps<{
  type: string;
}>();

const icons: Record<string, Component> = {
  magnifyingGlass: MagnifyingGlass,
  eye: Eye,
  eyeOff: EyeOff,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronUp: ChevronUp,
  chevronDown: ChevronDown,
  analytics: Analytic,
  list: List,
  user: UserIcon,
  home: Home,
  tool: Tool,
  logOut: LogOut,
  plus: Plus,
  x: Close,
  horizontalDots: HorizontalDots,
};
</script>

<template>
  <div class="flex justify-center items-center w-[16px] h-[16px]">
    <component :is="icons[type]" />
  </div>
</template>

