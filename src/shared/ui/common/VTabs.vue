<script setup lang="ts">
import VSkeleton from "./VSkeleton.vue";

type Tabs = {
  id: string;
  label: string;
};

type TabsProps = {
  tabs: Tabs[];
  variant?: "primary" | "auth";
  loader?: boolean
};

const {
  tabs,
  variant = "primary",
  loader,
} = defineProps<TabsProps>();

const modalValue = defineModel<string>();

const styleVariant: Record<string, string> = {
  primary: `
    relative overflow-hidden
    text-text-color border-line-color py-5
    transition-all duration-300 ease-out
  `,
  auth: `relative w-[10rem] overflow-hidden
    text-text-color border-line-color py-5
    transition-all duration-300 ease-out`,
};
</script>

<template>
  <div
    v-if="loader"
    class="flex gap-5 bg-primary rounded-2xl shadow-soft p-5"
  >
    <VSkeleton
      v-for="tab in tabs"
      :key="tab.id"
      width="125"
      height="35"
    />
  </div>
  <div
    v-else
    class="flex w-full justify-between"
  >
    <button
      v-for="tab in tabs"
      :key="tab.id"
      :class="[
        'flex justify-center items-center cursor-pointer select-none group',
        styleVariant[variant]
      ]"
      @click="modalValue = tab.id"
    >
      <slot
        :name="`tab-${tab.id}`"
        :tab="tab"
      >
        {{ $t(tab.label) }}
      </slot>
      <div
        :class="[
          'absolute bottom-3 h-0.5 bg-main transition-all duration-300',
          tab.id === modelValue ?
            'w-[75%] opacity-100' :
            'w-0 opacity-0 group-hover:w-1/3 group-hover:opacity-100'
        ]"
      />
    </button>
  </div>
</template>

