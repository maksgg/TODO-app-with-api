<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import SidebarFooter from "./components/SidebarFooter.vue";
import SidebarHeader from "./components/SidebarHeader.vue";
import SidebarMain from "./components/SidebarMain.vue";

import { useModal } from "@/shared/composables/useModal";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import { SidebarLink } from "@/shared/types";
import VButton from "@/shared/ui/common/VButton.vue";
import VModal from "@/shared/ui/common/VModal.vue";

const userStore = useAuthStore();
const route = useRoute();
const { links } = defineProps<{ links: SidebarLink[]; }>();

const expanded = ref(false);
const showCustomizers = computed(() => route.name === "Dashboard");
const modal = useModal("logout");
const expandSidebar = () => expanded.value = !expanded.value;

const openModal = () => modal.open();
</script>

<template>
  <aside
    :class="[
      `flex flex-col justify-between items-start gap-5 border-sidebarBorder rounded-r-lg sidebar-bg
      p-6 text-sm transition-all sidebar-custom-bg border shadow-sidebarBgShadow`,
      expanded ? 'w-[20rem]': 'w-[5rem]'
    ]"
  >
    <div class="flex flex-col gap-6 w-full">
      <SidebarHeader
        :is-expanded="expanded"
        @is-expanded="expandSidebar"
      />
      <SidebarMain
        :links="links"
        :is-expanded="expanded"
      />
    </div>
    <SidebarFooter
      :is-expanded="expanded"
      :show-customizers="showCustomizers"
      @open-modal="openModal"
    />
  </aside>
  <VModal
    id="logout"
    title="Log out"
  >
    <div class="flex flex-col justify-center items-center gap-2">
      <h4 class="text-uiHead text-txtPrimary">
        Are you sure you want to log out?
      </h4>
      <p class="text-bodyM text-secondary">
        You’ll need to sign in again to access your account
      </p>
    </div>
    <template #footer>
      <div class="flex justify-center items-center gap-4">
        <VButton
          text="Cancel"
          class="!bg-transparent text-primary"
          @click="modal.close"
        />
        <VButton
          text="Log out"
          variant="dangerous"
          @click="userStore.logOutUser"
        />
      </div>
    </template>
  </VModal>
</template>

<style scoped>
.sidebar-bg {
  background:
    linear-gradient(180deg, rgba(16, 22, 36, 0.9) 0%, rgba(25, 33, 50, 0.9) 100%) padding-box,
    linear-gradient(180deg, rgba(255, 255, 255, 0.025) 0%, rgba(0, 0, 0, 0) 6.88%) padding-box,
    linear-gradient(180deg, rgba(0, 0, 0, 0) 85.25%, rgba(74, 118, 255, 0.0875) 100%) padding-box,
    linear-gradient(180deg, rgba(255, 255, 255, 0.015) 51.81%, rgba(0, 0, 0, 0) 68.99%) padding-box,
    linear-gradient(180deg, rgba(0, 0, 0, 0) 86.96%, rgba(74, 118, 255, 0.0525) 100%) padding-box,
    linear-gradient(
      180deg, rgba(108, 163, 255, 0.3) 0%,
      rgba(181, 139, 255, 0.3) 50%,
      rgba(100, 255, 226, 0.3) 100%) border-box;
}
</style>
