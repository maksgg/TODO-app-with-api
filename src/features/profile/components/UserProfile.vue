<script setup lang="ts">
import { ref, watch } from "vue";
import { toast } from "vue-sonner";

import useProfileRequests from "../api/useProfileRequests";

import { useAuthStore } from "@/shared/stores/useAuthStore";
import VAvatar from "@/shared/ui/common/VAvatar.vue";
import VButton from "@/shared/ui/common/VButton.vue";
import VInput from "@/shared/ui/common/VInput.vue";
import VModal from "@/shared/ui/common/VModal.vue";

const authStore = useAuthStore();

const isOpenModal = ref(false);
const inputName = ref(authStore.userData?.name);

const { updateOwnProfile } = useProfileRequests();

const { loading, execute } = updateOwnProfile({
  onSuccess: () => {
    authStore.getUser();
    isOpenModal.value = false;
    toast.success("Profile is successful updated");
  },
});

const openModalWindow = () => isOpenModal.value = true;

const updateProfile = async () => await execute({ data: { name: inputName.value } });

watch(
  () => isOpenModal.value,
  (newVal) => {
    if (newVal && authStore.userData?.name) {
      inputName.value = authStore.userData.name;
    }
  },
);
</script>

<template>
  <div
    class="flex justify-between items-center py-8 px-12 bg-primary
    bg-profileImg bg-cover bg-no-repeat rounded-2xl shadow-soft text-text-color"
  >
    <h1 class="text-3xl">
      Dashboard
    </h1>
    <div class="relative flex justify-between items-center gap-3">
      <VAvatar
        :name="authStore.userData?.name"
      />
      <h2>
        {{ authStore.userData?.name }}
      </h2>
      <VModal
        v-model="isOpenModal"
        as="form"
        title="Edit profile"
        size="sm"
        role="dialog"
        aria-modal="true"
        @submit.prevent="updateProfile"
      >
        <template #main>
          <VInput
            v-model="inputName"
          />
        </template>
        <template #footer>
          <VButton
            text="Update"
            type="submit"
            size="md"
            :loader="loading"
          />
        </template>
      </VModal>
      <VButton
        icon="edit-3"
        variant="link"
        @click="openModalWindow"
      />
    </div>
  </div>
</template>
