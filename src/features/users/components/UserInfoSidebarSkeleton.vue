<script setup lang="ts">
import VContainer from "@/shared/ui/common/VContainer.vue";
import VSkeleton from "@/shared/ui/common/VSkeleton.vue";
</script>

<template>
  <VContainer>
    <template #header>
      <VSkeleton
        variant="circle"
        width="160"
        height="160"
      />
    </template>
    <template #default>
      <div class="flex flex-col gap-2 mt-5">
        <VSkeleton
          v-for="i in 4"
          :key="i"
          variant="text"
        />
      </div>
    </template>
  </VContainer>
</template>
