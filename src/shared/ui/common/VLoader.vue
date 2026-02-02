<script setup lang="ts">
type LoaderProps = {
  size?: "sm" | "md" |"lg";
};
const props = withDefaults(defineProps<LoaderProps>(), {
  size: "sm",
});

const loaderSize: Record<LoaderProps["size"], string> = {
  sm: "w-4 h-4 after:w-4 after:h-4",
  md: "w-7 h-7",
  lg: "w-10 h-10",
};
</script>

<template>
  <div class="loader-wrapper">
    <div
      :class="['loader after:w', loaderSize[props.size]]"
    />
  </div>
</template>

<style scoped>
.loader-wrapper {
  /* Забезпечуємо позиціювання зверху по центру контейнера */
  position: absolute;
  top: 1rem; /* Відступ зверху, можна змінити на 0 */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  z-index: 10;
}
.loader {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
  border-top: 4px solid #A6ADCF;
  border-right: 4px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.loader::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border-bottom: 4px solid #4B5BFF;
  border-left: 4px solid transparent;
}
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
