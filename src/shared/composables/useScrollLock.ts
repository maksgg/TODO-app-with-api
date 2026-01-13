import { watch, onUnmounted, toValue, type MaybeRefOrGetter } from "vue";

export function useScrollLock(isOpen: MaybeRefOrGetter<boolean>) {
  const body = document.body;

  const lock = () => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
    body.style.overflow = "hidden";
  };

  const unlock = () => {
    body.style.paddingRight = "";
    body.style.overflow = "";
  };

  watch(
    () => toValue(isOpen),
    (newVal) => newVal ? lock() : unlock(),
    { immediate: true },
  );

  onUnmounted(() => unlock());
};
