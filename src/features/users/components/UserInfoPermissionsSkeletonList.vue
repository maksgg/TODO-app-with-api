<script setup lang="ts">
import VContainer from "@/shared/ui/common/VContainer.vue";
import VSkeleton from "@/shared/ui/common/VSkeleton.vue";
</script>

<template>
  <VContainer>
    <template #header>
      <div class="flex justify-between items-center gap-10">
        <div class="flex justify-between items-center gap-20">
          <VSkeleton
            width="160"
            height="42"
          />
          <VSkeleton
            width="120"
            height="24"
          />
        </div>
        <VSkeleton
          width="110"
          height="55"
        />
      </div>
    </template>
    <template #footer>
      <div class="flex flex-col gap-2 mt-5">
        <VSkeleton
          v-for="i in 17"
          :key="i"
          variant="text"
          width="25%"
        />
      </div>
    </template>
  </VContainer>
</template>
