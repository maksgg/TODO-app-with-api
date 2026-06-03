<script setup lang="ts">
import { tokenManager } from "@ametie/vue-muza-use";
import { computed, type Component } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

import useAuthRequests from "@/features/auth/api/useAuthRequests";
import {
  RegularUserLogin,
  LoginForm,
  RegisterForm,
} from "@/features/auth/components/index";
import type { AuthFormType } from "@/features/auth/types";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import { VTabs } from "@/shared/ui/index";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const authTabs = computed(() => {
  return [
    { id: "login", label: t("auth.tabs.sign_in") },
    { id: "register", label: t("auth.tabs.sign_up") },
  ];
});

const activeTab = computed({
  get: () => {
    const mode = route.query.mode as AuthFormType;
    return forms[mode] ? mode : "login";
  },
  set: (newVal) => switchForm(newVal),
});
const activeTabComponent = computed(() => forms[activeTab.value]);

const switchForm = (step: AuthFormType) => {
  router.replace({
    query: {
      mode: step,
    },
  });
};

const forms: Record<AuthFormType, Component> = {
  login: LoginForm,
  register: RegisterForm,
};

const useStore = useAuthStore();
const { fetchLoginUser } = useAuthRequests();
const { loading, execute } = fetchLoginUser({
  authMode: "public",
  onSuccess: async ({ data }) => {
    tokenManager.setTokens({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
    await useStore.setUser();
    useStore.isAdmin();
  },
});
const submitRegularUser = async () => {
  await execute({ data: () => ({
    email: "regular.user@gmail.com",
    password: "regular_user",
  }) });
};
</script>

<template>
  <div
    class="flex flex-col justify-center items-center gap-8 px-12 py-8
    bg-auth-form border border-auth-border rounded-2xl w-110"
  >
    <VTabs
      v-model="activeTab"
      :tabs="authTabs"
      variant="auth"
    />
    <component
      :is="activeTabComponent"
      :regular-user-loader="loading"
      @to-login="switchForm"
    >
      <RegularUserLogin
        :loader="loading"
        @submit-regular-user="submitRegularUser"
      />
    </component>
  </div>
</template>
