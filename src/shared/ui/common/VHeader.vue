<script setup lang="ts">
const { title } = defineProps<{ title?: string; }>();
</script>

<template>
  <Teleport
    defer
    to="#header-teleport"
  >
    <div
      class="flex justify-between items-center header-container rounded-xl
      py-3 px-4 mx-12 mt-6 empty:hidden"
    >
      <slot name="title">
        <h2
          v-if="title"
          class="text-intro"
        >
          {{ title }}
        </h2>
      </slot>
      <slot name="actions" />
    </div>
  </Teleport>
</template>

<style scoped>
.header-container {
  border: 2px solid transparent;
  background-image:
    linear-gradient(var(--color-headerBorder, #fff), var(--color-headerBorder, #fff)),
    linear-gradient(90deg, rgba(62, 13, 168, 1) 0%, rgba(95, 134, 239, 1) 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
</style>
