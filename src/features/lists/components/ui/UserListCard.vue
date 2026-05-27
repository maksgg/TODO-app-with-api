<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

import type { UserGroupInfo } from "../../types";

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
      `flex flex-col gap-5 p-6 bg-secondary-bg shadow-inner-border transition-all hover:scale-105`,
      isExpanded ? 'rounded-t-xl z-50 relative' : 'rounded-xl z-0 relative',
    ]"
  >
    <div class="flex flex-col gap-1">
      <h3 class="text-heading-card text-txt-primary">
        {{ userListsInfo.name }}
      </h3>
      <h4 class="text-ui-caption text-muted">
        {{ userListsInfo.email }}
      </h4>
      <h4 class="text-body-emphasis text-txt-primary border-b border-border-default pb-2">
        {{ $t("lists.card.role:") }}
        <span class="text-body-m text-secondary">
          {{ $t(`usersTable.toolbar.${userListsInfo.role}`).toLowerCase() }}
        </span>
      </h4>
    </div>
    <div class="relative w-full">
      <VButton
        :text="`${$t('lists.lists')} (${totalLists})`"
        variant="ghost"
        icon-size="sm"
        class="text-txt-primary"
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
        class="absolute left-0 top-full z-50 w-full -mt-0.5 rounded-xl rounded-t-none
        border border-t-0 border-list-card-border bg-secondary-bg p-4 shadow-custom-shadow"
      >
        <div class="flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar max-h-50">
          <div
            v-for="(list, index) in userListsInfo.allTitles"
            :key="list.listId"
            :style="{ zIndex: userListsInfo.allTitles.length - index }"
            class="group relative flex items-center gap-1 text-body-m text-txt-primary
                bg-secondary-bg rounded-lg border border-transparent cursor-pointer
                transition-all"
          >
            <VButton
              :text="list.title"
              variant="ghost"
              icon-size="sm"
              :disabled="disabled"
              :class="[
                disabled ? '' : 'group-hover:text-active-primary transition-colors',
              ]"
              @click="openList(list.listId)"
            />
            <span
              :class="[
                'text-muted text-ui-caption',
                disabled ? '' : 'group-hover:text-active-primary transition-colors'
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
