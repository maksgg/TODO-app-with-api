<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";

import useAuthRequests from "@/features/auth/api/useAuthRequests";
import { useRegisterFormValidation } from "@/features/auth/composables/useAuthValidation";
import type { AuthFormType } from "@/features/auth/types";
import VButton from "@/shared/ui/common/VButton.vue";
import VInput from "@/shared/ui/common/VInput.vue";

const { regularUserLoader } = defineProps<{ regularUserLoader: boolean; }>();

const { state, v$ } = useRegisterFormValidation();
const { t } = useI18n();
const { fetchRegisterUser } = useAuthRequests();

const { loading, error, execute: request } = fetchRegisterUser({
  authMode: "public",
  onSuccess: () => {
    toast.success(t("auth.register.success_registration"));
    emit("toLogin", "login");
  },
});

const emit = defineEmits<{ "toLogin" : [AuthFormType] }>();

const submitForm = async () => {
  const validate = await v$.value.$validate();

  if(!validate) return;

  await request({ data: state });
};
</script>

<template>
  <form
    class="flex flex-col items-center gap-5
    rounded-xl w-full text-auth-title text-txt-primary-dark"
    @submit.prevent="submitForm"
  >
    <h1>
      {{ $t("auth.register.create_account") }}
    </h1>
    <VInput
      v-model="state.name"
      :label="t('auth.register.name')"
      :validation="v$.name"
      :placeholder="$t('auth.register.enter_your_name')"
    />
    <VInput
      v-model="state.email"
      :label="t('auth.register.email')"
      :validation="error?.status ?
        { $error: true, $errors: [{ $message: error.message }] } : v$.email"
      :placeholder="$t('auth.register.enter_your_email')"
    />
    <VInput
      v-model="state.password"
      :label="t('auth.register.password')"
      :validation="v$.password"
      type="password"
      :placeholder="$t('auth.register.enter_your_password')"
    />
    <VButton
      :text="$t('auth.register.sign_up')"
      type="submit"
      size="full"
      :loader="loading || regularUserLoader"
      class="mt-3"
    />
    <slot />
  </form>
</template>
