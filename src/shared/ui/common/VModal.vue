<script setup lang="ts">
import { useScrollLock } from "@/shared/composables/useScrollLock";

const {
  as = "div",
  title = "",
  size = "md",
  isCloseBtn = true,
} = defineProps<{
  as?: "div" | "form" | "dialog";
  title?: string;
  size?: "sm" | "md" | "lg";
  isCloseBtn?: boolean;
}>();

defineOptions({
  inheritAttrs: false,
});

const isOpen = defineModel<boolean>({ required: true });

const closeModal = () => isOpen.value = false;

useScrollLock(() => isOpen.value);

const sizeClasses = {
  sm: "w-[20rem]",
  md: "w-[25rem]",
  lg: "w-[48rem]",
};
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
        @click.self="closeModal"
      >
        <component
          :is="as"
          v-bind="$attrs"
          role="dialog"
          aria-modal="true"
          :class="[
            `bg-primary p-6 flex flex-col items-center gap-4 rounded-xl
            text-text-color shadow-soft transition-all`,
            sizeClasses[size]
          ]"
        >
          <button
            v-if="isCloseBtn"
            class="flex justify-center items-center self-end
            h-8 w-8 rounded-full hover:text-gray-600 transition-all"
            type="button"
            @click="closeModal"
          >
            <VueFeather
              type="x"
              size="24"
            />
          </button>
          <header
            v-if="title || $slots.header"
            class="flex w-full text-center"
          >
            <slot name="header">
              <h3 class="self-start text-2xl font-semibold leading-none">
                {{ title }}
              </h3>
            </slot>
          </header>
          <div class="flex flex-col justify-center text-center gap-2 w-full">
            <slot name="main" />
          </div>
          <footer
            v-if="$slots.footer"
            class="flex justify-center gap-4 w-full"
          >
            <slot name="footer" />
          </footer>
        </component>
      </div>
    </Transition>
  </Teleport>
</template>
