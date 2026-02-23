<script setup lang="ts">
import VSkeleton from "./VSkeleton.vue";

type Tabs = {
  id: string;
  label: string;
};

type TabsProps = {
  tabs: Tabs[];
  variant?: "primary" | "auth";
  title?: string;
  loader?: boolean
  disabled?: boolean;
};

const {
  tabs,
  title = "",
  variant = "primary",
  loader,
} = defineProps<TabsProps>();

const modelValue = defineModel<string>();


const containerStyle: Record<string, string> = {
  primary: "flex w-fit bg-primaryBg p-1 rounded-xl gap-1 items-center",
  auth: "flex justify-center w-full gap-6",
};

const tabStyle: Record<string, string> = {
  primary: `relative px-4 py-1.5 text-uiLabel text-muted border border-primaryBg
  rounded-lg transition-all duration-300 ease-out disabled:opacity-50`,
  auth: "relative pb-3 px-1 text-base font-semibold transition-all duration-300 ease-out",
};

const activeStyle: Record<string, string> = {
  primary: "bg-secondaryBg text-txtPrimary shadow-md",
  auth: "text-primary",
};

const inactiveStyle: Record<string, string> = {
  primary: "text-gray-500 hover:secondaryBg",
  auth: "text-gray-400 hover:text-gray-600",
};
</script>

<template>
  <div
    v-if="loader"
    class="flex gap-2 p-2"
  >
    <VSkeleton
      v-for="tab in tabs"
      :key="tab.id"
      width="80"
      height="32"
    />
  </div>
  <div
    v-else
    :class="containerStyle[variant]"
  >
    <span
      v-if="title"
      class="text-sm font-medium text-secondaryBg px-2"
    >{{ title }}</span>

    <button
      v-for="tab in tabs"
      :key="tab.id"
      :disabled="disabled"
      :class="[
        'flex justify-center items-center cursor-pointer select-none relative group',
        tabStyle[variant],
        tab.id === modelValue ? activeStyle[variant] : inactiveStyle[variant]
      ]"
      @click="modelValue = tab.id"
    >
      <slot
        :name="`tab-${tab.id}`"
        :tab="tab"
      >
        <span class="relative z-10">{{ tab.label }}</span>
      </slot>

      <div
        v-if="variant === 'auth'"
        :class="[
          'absolute bottom-0 h-[3px] rounded-t-full transition-all duration-300',
          tab.id === modelValue ?
            'w-full opacity-100 bg-primary' :
            'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-100'
        ]"
      />
    </button>
  </div>
</template>
