<script setup lang="ts">
import { ref, computed } from "vue";

import { useAuthStore } from "@/shared/stores/useAuthStore";
import VButton from "@/shared/ui/common/VButton.vue";
import VModal from "@/shared/ui/common/VModal.vue";

const userStore = useAuthStore();
const expanded = ref(false);
const isOpenModal = ref(false);

const expandSidebar = () => expanded.value = !expanded.value;
const openLogoutModal = () => isOpenModal.value = true;
const closeLogoutModal = () => isOpenModal.value = false;

const sidebarLinks = [
  {
    text: "Dashboard",
    icon: "home",
    to: "/",
    tooltip: "Dashboard",
  },
  {
    text: "Lists",
    icon: "list",
    to: "/list",
    tooltip: "Lists of Tasks",
  },
  {
    text: "Analytics",
    icon: "bar-chart-2",
    to: "/analytics",
    tooltip: "Analytics",
  },
  {
    text: "Profile",
    icon: "user",
    to: "/profile",
    tooltip: "Own Profile",
  },
  {
    text: "Admin Panel",
    icon: "tool",
    to: "/users",
    tooltip: "Admin Panel",
    isAdmin: true,
  },
];

const filteredLinks = computed(() => {
  return sidebarLinks.filter(link => !link.isAdmin || userStore.userData?.role === "admin");
});
</script>

<template>
  <aside
    :class="[
      `flex flex-col justify-between items-start gap-5 rounded-r-lg
      p-6 bg-sidebar overflow-visible text-sm transition-all`,
      expanded ? 'w-[16rem]': 'w-[5rem]'
    ]"
  >
    <div class="flex flex-col gap-5 w-full">
      <VButton
        :icon="expanded ? 'chevron-left' : 'chevron-right'"
        variant="ghost"
        class="self-end pr-1"
        @click="expandSidebar"
      />
      <VButton
        v-for="link in filteredLinks"
        :key="link.to"
        :text="link.text"
        :icon="link.icon"
        :to="link.to"
        :tooltip="link.tooltip"
        :show-text="expanded"
        size="full"
        variant="sidebar"
      />
    </div>
    <div class="flex flex-col gap-5 w-full">
      <VButton
        text="Log out"
        :show-text="expanded"
        icon="log-out"
        size="full"
        variant="sidebar"
        tooltip="Log out"
        @click="openLogoutModal"
      />
    </div>
    <VModal
      v-model="isOpenModal"
      title="Log out"
      :is-close-btn="false"
    >
      <template #main>
        <h4 class="font-bold">
          Are you sure you want to log out?
        </h4>
        <p class="text-sm">
          You’ll need to sign in again to access your account
        </p>
      </template>
      <template #footer>
        <div class="flex justify-center gap-4 mt-4">
          <VButton
            text="Cancel"
            @click="closeLogoutModal"
          />
          <VButton
            text="Log out"
            variant="dangerous"
            @click="userStore.logOutUser"
          />
        </div>
      </template>
    </VModal>
  </aside>
</template>
