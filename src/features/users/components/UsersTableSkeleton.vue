<script setup lang="ts">
import { VSkeleton } from "@/shared/ui/index";
</script>

<template>
  <div class="flex flex-col gap-6 w-full">
    <div class="pl-2">
      <VSkeleton
        width="40%"
        height="44"
      />
    </div>

    <div
      class="flex flex-col border-b border-border-default bg-primary-bg"
    >
      <div class="flex px-2">
        <div class="flex gap-2 w-[45%]">
          <VSkeleton
            width="60%"
            height="25"
          />
        </div>

        <div class="flex-1 pl-3.5">
          <VSkeleton
            width="70"
            height="25"
          />
        </div>

        <div class="flex-1">
          <VSkeleton
            width="100"
            height="25"
          />
        </div>

        <div class="flex justify-end gap-5 w-[30%]">
          <VSkeleton
            width="100"
            height="25"
          />
        </div>
      </div>


      <div
        v-for="i in 9"
        :key="i"
        class="flex items-center gap-4 px-2 py-5 border-b border-border-default last:border-0"
      >
        <div class="flex flex-col gap-2 w-[45%]">
          <VSkeleton
            width="60%"
            height="18"
          />
          <VSkeleton
            width="40%"
            height="14"
          />
        </div>

        <div class="flex-1">
          <VSkeleton
            width="70"
            height="20"
          />
        </div>

        <div class="flex-1">
          <VSkeleton
            width="100"
            height="16"
          />
        </div>

        <div class="flex justify-end gap-5 w-[30%]">
          <VSkeleton
            width="24"
            height="14"
          />
        </div>
      </div>
    </div>
  </div>
</template>
