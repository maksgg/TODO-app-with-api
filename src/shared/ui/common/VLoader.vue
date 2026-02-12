<script setup lang="ts">
type LoaderProps = {
  size?: "sm" | "md" | "lg";
};

const props = withDefaults(defineProps<LoaderProps>(), {
  size: "sm",
});

// Визначаємо конкретний розмір у пікселях для кожного пропса
const sizes = {
  sm: "20px",
  md: "28px",
  lg: "40px",
};
</script>

<template>
  <div
    class="loader-wrapper"
    :style="{ '--size': sizes[props.size] }"
  >
    <div class="loader" />
  </div>
</template>

<style scoped>
.loader-wrapper {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  z-index: 100;
}

.loader {
  /* Використовуємо значення з пропса */
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid #A6ADCF;
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  position: relative;
}

.loader::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  /* Після тегу ::after розмір має бути 100% від батька */
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  border-bottom: 3px solid #4B5BFF;
  border-left: 3px solid transparent;
}

@keyframes rotation {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
