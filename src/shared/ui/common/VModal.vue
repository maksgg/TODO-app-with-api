<script setup lang="ts">
import VButton from "./VButton.vue";

import { useScrollLock } from "@/shared/composables/useScrollLock";

const {
  as = "div",
  title = "",
  btnTitle = "Save",
  btnVariant = "primary",
  size = "md",
  loader = false,
  isChanged = false,
} = defineProps<{
  as?: "div" | "form" | "dialog";
  title?: string;
  btnTitle: string;
  btnVariant?: "primary" | "dangerous" | "ghost" | "sidebar";
  size?: "sm" | "md" | "lg";
  loader?: boolean;
  isChanged?: boolean;
}>();

defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits<{ "submit": [void] }>();

const submit = () => emit("submit");

const isOpen = defineModel<boolean>();

const closeModal = () => isOpen.value = false;

useScrollLock(() => Boolean(isOpen.value));

const sizeClasses = {
  sm: "w-[20rem]",
  md: "w-[25rem]",
  lg: "w-[27.5rem]",
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
            `bg-secondaryBg p-6 flex flex-col items-center gap-4 rounded-xl
            shadow-soft transition-all`,
            sizeClasses[size]
          ]"
          @submit.prevent="as === 'form' ? submit() : null"
        >
          <header
            v-if="title || $slots.header"
            class="flex w-full text-center"
          >
            <slot name="header">
              <h3 class="self-start text-modalHead text-txtPrimary">
                {{ title }}
              </h3>
            </slot>
          </header>
          <div class="flex flex-col justify-center text-center gap-2 w-full">
            <slot name="main" />
          </div>
          <footer
            class="flex justify-center gap-4 w-full"
          >
            <slot name="footer">
              <div
                :class="[
                  'flex gap-5 mt-5 w-full',
                  as === 'form' ? 'justify-end' : 'justify-center']"
              >
                <VButton
                  text="Cancel"
                  @click="closeModal"
                />
                <VButton
                  :text="btnTitle"
                  :type="as === 'form' ? 'submit' : 'button'"
                  :variant="btnVariant"
                  :loader="loader"
                  :disabled="loader || isChanged"
                  @click="as === 'div' ? submit() : null"
                />
              </div>
            </slot>
          </footer>
        </component>
      </div>
    </Transition>
  </Teleport>
</template>
