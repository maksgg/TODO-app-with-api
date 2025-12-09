<script setup lang="ts">
type LoaderProps = {
  size?: "sm" | "md" |"lg";
};
const props = withDefaults(defineProps<LoaderProps>(), {
  size: "sm",
});

const loaderSize: Record<LoaderProps["size"], string> = {
  sm: "w-5 h-5",
  md: "w-7 h-7",
  lg: "w-10 h-10",
};
</script>

<template>
  <div
    :class="['loader', loaderSize[props.size]]"
  />
</template>

<style scoped>
.loader {
  background-color: #696565;
  padding: 5px;
  aspect-ratio: 1;
  border-radius: 50%;
  --_m:
    conic-gradient(#0000 10%,#000),
    linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
          mask: var(--_m);
  -webkit-mask-composite: source-out;
          mask-composite: subtract;
  animation: l3 1s infinite linear;
}
@keyframes l3 {to{transform: rotate(1turn)}}
</style>
