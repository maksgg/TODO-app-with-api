<script setup lang="ts">
import { computed } from "vue";

const { active, order, color } = defineProps<{
  active?: boolean;
  order?: string;
  color?: string;
}>();

const activeColor = color || "#4D9FFF";
const inactiveColor = "#D1D5DB";

const upArrowColor = computed(() => {
  if (!active) return inactiveColor;

  return order === "asc" || !order ? activeColor : inactiveColor;
});

const downArrowColor = computed(() => {
  if (!active) return inactiveColor;

  return order === "desc" ? activeColor : inactiveColor;
});
</script>

<template>
  <svg
    width="22"
    height="22"
    viewBox="0 0 57 57"
    fill="none"
  >
    <path
      d="M22.9781 1.06876C22.4437 1.06876 22.0875 1.24688 21.7312 1.60313L10.6875 12.6469C9.97495
      13.3594 9.97495 14.4281 10.6875 15.1406C11.4 15.8531 12.6468 15.8531 13.3593 15.1406L21.1968
      7.30313V46.6688C21.1968 47.7375 22.0875 48.6281 22.9781 48.6281C24.0468 48.6281 24.7593
      47.7375 24.7593 46.6688V2.85001C24.7593 1.95938 24.0468 1.06876 22.9781 1.06876Z"
      :fill="upArrowColor"
    />

    <path
      d="M33.8437 6.59063C32.7749 6.59063 32.0625 7.48126 32.0625 8.37188V53.9719C32.0625 55.575
      34.0218 56.4656 35.0906 55.2188L45.9562 44.175C46.6687 43.4625 46.6687 42.2156 45.9562
      41.5031C45.2437 40.7906 43.9968 40.7906 43.2843 41.5031L35.4468 49.3406V8.37188C35.8031
      7.30313 34.9124 6.59063 33.8437 6.59063Z"
      :fill="downArrowColor"
    />
  </svg>
</template>
