<script setup lang="ts">
import { computed } from "vue";

type SkeletonProps = {
  width?: string;
  height?: string;
  variant?: "text" | "circle" | "rectangle";
};

const { width, height, variant }= defineProps<SkeletonProps>();

const formatSize = (val?: string) => {
  const isPureNumber = /^\d+$/.test(val);

  return isPureNumber ? `${val}px` : val;
};

const skeletonStyles = computed(() => ({
  width: formatSize(width),
  height: formatSize(height),
}));

const variantClasses = {
  text: "h-6 w-full",
  circle: "rounded-full",
  rectangle: "rounded-md",
};
</script>

<template>
  <div
    :class="[
      `skeleton-loader relative overflow-hidden rounded-2xl
      animate-pulse bg-gray-300 dark:bg-gray-700`,
      variantClasses[variant]
    ]"
    :style="skeletonStyles"
  />
</template>

<style scoped>
.skeleton-loader::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    90deg,
    transparent 0,
    rgba(255, 255, 255, 0) 20%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0) 80%,
    transparent 100%
  );
  animation: shimmer 1.5s infinite;
  transform: translateX(-100%);
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

@media (prefers-color-scheme: dark) {
  .skeleton-loader::after {
    background: linear-gradient(
      90deg,
      transparent 0,
      rgba(255, 255, 255, 0) 20%,
      rgba(55, 65, 81, 0.4) 50%,
      rgba(255, 255, 255, 0) 80%,
      transparent 100%
    );
  }
}
</style>
