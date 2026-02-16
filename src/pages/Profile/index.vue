<script setup lang="ts">
import { useRoute } from "vue-router";

import UserProfile from "@/features/profile/UserProfile.vue";
import UserInfo from "@/widgets/UserInfo/UserInfo.vue";

const route = useRoute();
</script>

<template>
  <UserInfo v-if="route.query.id" />
  <UserProfile v-else />
</template>
