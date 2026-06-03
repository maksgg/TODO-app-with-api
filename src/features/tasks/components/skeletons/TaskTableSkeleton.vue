<script setup lang="ts">
import { VSkeleton } from "@/shared/ui/index";
</script>

<template>
  <div class="flex flex-col gap-8 w-full">
    <div class="flex flex-col gap-6">
      <div class="flex flex-col">
        <div
          v-for="i in 5"
          :key="'pending-' + i"
          class="flex items-center gap-4 py-4 border-b border-border-default"
        >
          <div
            class="flex items-center gap-3 pl-2"
            style="width: 42%"
          >
            <VSkeleton
              width="20"
              height="20"
            />
            <VSkeleton
              width="70%"
              height="20"
            />
          </div>
          <div class="flex-1">
            <VSkeleton
              width="80"
              height="20"
            />
          </div>
          <div class="flex-1">
            <VSkeleton
              width="100"
              height="20"
            />
          </div>
          <div style="width: 25%">
            <div class="flex gap-2">
              <VSkeleton
                v-for="tag in 3"
                :key="'tag-' + tag"
                width="50"
                height="20"
              />
            </div>
          </div>
          <div
            class="flex justify-end"
            style="width: 3%"
          >
            <VSkeleton
              width="100%"
              height="20"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
