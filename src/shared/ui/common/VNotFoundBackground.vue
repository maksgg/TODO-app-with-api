<template>
  <div class="w-full max-w-lg mx-auto flex flex-col items-center">
    <svg
      viewBox="0 0 500 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="w-full h-auto"
    >
      <rect
        x="50"
        y="50"
        width="400"
        height="300"
        rx="16"
        fill="currentColor"
        class="text-secondary opacity-10"
      />
      <rect
        x="80"
        y="80"
        width="340"
        height="20"
        rx="4"
        fill="currentColor"
        class="text-primary opacity-20"
      />

      <rect
        x="80"
        y="130"
        width="200"
        height="15"
        rx="4"
        fill="currentColor"
        class="text-uiLabel opacity-20"
      />
      <circle
        cx="310"
        cy="137.5"
        r="7.5"
        fill="currentColor"
        class="text-success opacity-30"
      />

      <rect
        x="80"
        y="170"
        width="150"
        height="15"
        rx="4"
        fill="currentColor"
        class="text-uiLabel opacity-20"
      />
      <circle
        cx="310"
        cy="177.5"
        r="7.5"
        fill="currentColor"
        class="text-warning opacity-30"
      />

      <g class="animate-pulse">
        <rect
          x="250"
          y="230"
          width="160"
          height="120"
          rx="8"
          fill="currentColor"
          class="text-elevated stroke-borderDefault stroke-2 shadow-xl"
        />
        <text
          x="330"
          y="300"
          text-anchor="middle"
          font-family="Arial, sans-serif"
          font-weight="bold"
          font-size="64"
          fill="currentColor"
          class="text-primary"
        >404</text>
        <rect
          x="270"
          y="325"
          width="120"
          height="8"
          rx="4"
          fill="currentColor"
          class="text-secondary opacity-30"
        />
      </g>

      <rect
        x="320"
        y="215"
        width="20"
        height="30"
        rx="4"
        fill="currentColor"
        class="text-borderDefault opacity-70"
        transform="rotate(-15 330 230)"
      />
    </svg>
  </div>
</template>
