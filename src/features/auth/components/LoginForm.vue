<script setup lang="ts">
import { tokenManager } from "@ametie/vue-muza-use";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";

import useAuthRequests from "@/features/auth/api/useAuthRequests";
import { useLoginFormValidation } from "@/features/auth/composables/useAuthValidation";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import VButton from "@/shared/ui/common/VButton.vue";
import VInput from "@/shared/ui/common/VInput.vue";

const { t } = useI18n();
const { state, v$ } = useLoginFormValidation();
const { fetchLoginUser } = useAuthRequests();
const useStore = useAuthStore();

const { loading, error, execute: request } = fetchLoginUser({
  authMode: "public",
  onSuccess: async ({ data }) => {
    toast.success(t("auth.login.success"));
    tokenManager.setTokens({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
    await useStore.setUser();
    useStore.isAdmin();
  },
});

const submitForm = async () => {
  const validate = await v$.value.$validate();

  if (!validate) return;

  await request({ data: state });
};
</script>

<template>
  <form
    class="flex flex-col items-center gap-5
    rounded-xl w-full text-authTitle text-txtPrimaryDark"
    @submit.prevent="submitForm"
  >
    <h1>
      {{ $t('auth.login.Welcome_back') }}
    </h1>
    <VInput
      v-model="state.email"
      :label="t('auth.login.email')"
      :validation="error?.status ?
        { $error: true, $errors: [{ $message: error.message }] } : v$.email"
      :placeholder="$t('auth.login.enter_your_email')"
    />
    <VInput
      v-model="state.password"
      :label="t('auth.login.password')"
      :validation="error?.status ?
        { $error: true, $errors: [{ $message: error.message }] } : v$.password"
      type="password"
      :placeholder="$t('auth.login.enter_your_password')"
      @input="error = null"
    />
    <VButton
      :text="$t('auth.login.sign_in')"
      type="submit"
      size="full"
      :loader="loading"
      class="mt-3"
    />
  </form>
</template>
