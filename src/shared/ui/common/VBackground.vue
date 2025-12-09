<template>
  <svg
    class="w-full h-full stroke-grid-color duration-300 opacity"
    width="100%"
    height="100%"
  >
    <defs>
      <pattern
        id="grid-pattern"
        width="60"
        height="60"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M 60 0 L 0 0 0 60"
          fill="none"
          stroke-width="1"
        />
      </pattern>
    </defs>

    <rect
      width="100%"
      height="100%"
      fill="url(#grid-pattern)"
    />
  </svg>
</template>

<style scoped>
.opacity {
  opacity: 0.2;
}
</style>
