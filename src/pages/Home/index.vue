<script setup lang="ts">
import { useRouter } from "vue-router";

import VButton from "@/shared/ui/common/VButton.vue";
import UserProfile from "@/widgets/profileSidebar/UserProfile.vue";

const route = useRouter();

const toLoginPage = () => {
  route.push("/login");
};
</script>

<template>
  <div class="flex flex-row-reverse justify-center items-center gap-10 text-2xl">
    <div class="flex flex-col gap-5 text-text-color">
      Home Page
      <VButton
        text="To Login"
        size="fit"
        @click="toLoginPage"
      />
    </div>
    <UserProfile />
  </div>
</template>
