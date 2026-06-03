<script setup lang="ts">
import { VContainer, VSkeleton } from "@/shared/ui/index";
</script>

<template>
  <VContainer>
    <template #header>
      <VSkeleton
        width="250"
        height="30"
      />
      <VSkeleton
        width="200"
        height="20"
      />
    </template>
    <div class="grid grid-cols-2 gap-8">
      <div
        v-for="(list, index) in 4"
        :key="index"
        class="flex flex-col gap-4"
      >
        <VSkeleton
          width="300"
          height="30"
        />
        <div
          v-for="(el, index1) in 5"
          :key="index1"
        >
          <VSkeleton
            width="250"
            height="24"
          />
        </div>
      </div>
    </div>
    <template #footer>
      <div class="ml-auto">
        <VSkeleton
          width="150"
          height="40"
        />
      </div>
    </template>
  </VContainer>
</template>
