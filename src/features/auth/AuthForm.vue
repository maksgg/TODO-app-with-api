<script setup lang="ts">
import { ref } from "vue";

import LoginForm from "@/features/auth/components/LoginForm.vue";
import RegisterForm from "@/features/auth/components/RegisterForm.vue";
import type { AuthFormType } from "@/features/auth/types/index";

const authForm = ref<AuthFormType>("login");

const switchForm = (step: AuthFormType) => authForm.value = step;

const forms = {
  login: LoginForm,
  register: RegisterForm,
};
</script>

<template>
  <component
    :is="forms[authForm]"
    @toggle="switchForm"
  />
</template>
