<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

import { UserGroupInfo } from "../../types";

import VButton from "@/shared/ui/common/VButton.vue";
import VIcon from "@/shared/ui/common/VIcon.vue";

const { userListsInfo, totalLists, isExpanded, disabled } = defineProps<UserGroupInfo>();

const emit = defineEmits<{ "expandList": [id: string], "openList": [id: string] }>();

const expandList = () => emit("expandList", userListsInfo.ownerId);
const openList = (id: string) => emit("openList", id);

const target = ref(null);
onClickOutside(target, () => {
  if (isExpanded) {
    emit("expandList", userListsInfo.ownerId);
  }
});
</script>

<template>
  <div
    ref="target"
    :class="[
      `flex flex-col gap-5 p-6 bg-secondaryBg shadow-innerBorder transition-all hover:scale-105`,
      isExpanded ? 'rounded-t-xl z-50 relative' : 'rounded-xl z-0 relative',
    ]"
  >
    <div class="flex flex-col gap-1">
      <h3 class="text-headingCard text-txtPrimary">
        {{ userListsInfo.name }}
      </h3>
      <h4 class="text-uiCaption text-muted">
        {{ userListsInfo.email }}
      </h4>
      <h4 class="text-bodyEmphasis text-txtPrimary border-b border-borderDefault pb-2">
        Role: <span class="text-bodyM text-secondary">{{ userListsInfo.role }}</span>
      </h4>
    </div>
    <div class="relative w-full">
      <VButton
        :text="`Lists (${totalLists})`"
        variant="ghost"
        icon-size="sm"
        class="text-txtPrimary"
        @click="expandList"
      >
        <template #icon-right>
          <VIcon
            type="chevronUp"
            :class="[
              'flex flex-row-reverse transition-transform duration-300 text-secondary',
              isExpanded ? 'rotate-0' : 'rotate-180'
            ]"
          />
        </template>
      </VButton>
    </div>
    <Transition name="slide-fade">
      <div
        v-if="isExpanded"
        class="absolute left-0 top-full z-50 w-full mt-[-2px] rounded-xl rounded-t-none
        border border-t-0 border-listCardBorder bg-secondaryBg p-4 shadow-customShadow"
      >
        <div class="flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar max-h-[200px]">
          <div
            v-for="(list, index) in userListsInfo.allTitles"
            :key="list.listId"
            :style="{ zIndex: userListsInfo.allTitles.length - index }"
            class="group relative flex items-center gap-1 text-bodyM text-txtPrimary
                bg-secondaryBg rounded-lg border border-transparent cursor-pointer
                transition-all"
          >
            <VButton
              :text="list.title"
              variant="ghost"
              icon-size="sm"
              :disabled="disabled"
              :class="[disabled ? '' : 'group-hover:text-activePrimary transition-colors']"
              @click="openList(list.listId)"
            />
            <span
              :class="[
                'text-muted text-uiCaption',
                disabled ? '' : 'group-hover:text-activePrimary transition-colors'
              ]"
            >
              ({{ list.totalTasks }})
            </span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Анімація в'їзду */
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* Опціонально: зробимо гарний скролбар */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #3B82F6;
  border-radius: 10px;
}
</style>
