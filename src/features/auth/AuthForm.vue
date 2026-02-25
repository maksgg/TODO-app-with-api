<script setup lang="ts">
import { computed, type Component } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

import LoginForm from "@/features/auth/components/LoginForm.vue";
import RegisterForm from "@/features/auth/components/RegisterForm.vue";
import type { AuthFormType } from "@/features/auth/types/index";
import VTabs from "@/shared/ui/common/VTabs.vue";

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
</script>

<template>
  <div
    class="flex flex-col justify-center items-center gap-8 px-12 py-8
    bg-authForm border border-authBorder rounded-2xl w-[27.5rem]"
  >
    <VTabs
      v-model="activeTab"
      :tabs="authTabs"
      variant="auth"
    />
    <component
      :is="activeTabComponent"
      @to-login="switchForm"
    />
  </div>
</template>
