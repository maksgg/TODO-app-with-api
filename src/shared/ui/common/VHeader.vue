<script setup lang="ts">
const { title } = defineProps<{ title?: string; }>();
</script>

<template>
  <div
    class="flex justify-between items-center bg-secondaryBg header-container rounded-xl
    py-3 px-4 empty:hidden"
  >
    <slot name="title">
      <h2
        v-if="title"
        class="text-intro text-txtIntro"
      >
        {{ title }}
      </h2>
    </slot>
    <slot name="actions" />
  </div>
</template>

<style scoped>
.header-container {
  border: 2px solid transparent;
  background-image:
    linear-gradient(var(--color-secondaryBg), var(--color-secondaryBg)),
    linear-gradient(90deg, rgba(62, 13, 168, 1) 0%, rgba(95, 134, 239, 1) 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
</style>
