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
    text-uiLabel border-line-color py-4 px-2 border border-black
    transition-all duration-300 ease-out
  `,
  auth: `relative w-[10rem] overflow-hidden
    text-primary border-line-color py-1
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
    class="flex w-full gap-2"
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
        <span
          :class="[
            tab.id === modelValue ?
              'drop-shadow-primary' : ' text-txtPrimaryDark']"
        >

          {{ $t(tab.label) }}
        </span>
      </slot>
      <div
        :class="[
          'absolute bottom-0 h-0.5 transition-all duration-300',
          tab.id === modelValue ?
            'w-[75%] opacity-100 drop-shadow-primary bg-primary' :
            'w-0 opacity-0 group-hover:w-1/3 group-hover:opacity-100 bg-txtPrimaryDark'
        ]"
      />
    </button>
  </div>
</template>

