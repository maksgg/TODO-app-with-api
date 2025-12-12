<script setup lang="ts">
import { toast } from "vue-sonner";

import useAuthRequests from "@/features/auth/api/useAuthRequests";
import { useRegisterFormValidation } from "@/features/auth/composables/useAuthValidation";
import type { AuthFormType, RegisterRequest } from "@/features/auth/types/index";
import VButton from "@/shared/ui/common/VButton.vue";
import VCheckbox from "@/shared/ui/common/VCheckbox.vue";
import VInput from "@/shared/ui/common/VInput.vue";

const { state, v$, mainRequestState } = useRegisterFormValidation();

const { fetchRegisterUser } = useAuthRequests();

const { loading, error, execute } = fetchRegisterUser({
  onSuccess: () => {
    toast.success("Success registration");
    emit("toggle", "login");
  },
});

const request = async (state: RegisterRequest) => await execute({ data: state });

const submitForm = async () => {
  const validate = await v$.value.$validate();

  if(!validate) return;

  const mainState = mainRequestState();

  await request(mainState);
};

const emit = defineEmits<{ "toggle" : [AuthFormType] }>();

const changeForm = () => emit("toggle", "login");
</script>

<template>
  <form
    class="flex flex-col items-center gap-5
    rounded-xl w-[24rem] text-text-color"
    @submit.prevent="submitForm"
  >
    <h1 class="text-login leading-none mb-[25px]">
      Create Account
    </h1>
    <VInput
      v-model="state.name"
      :validation="v$.name"
      variant="custom"
      icon="user"
      placeholder="Your name"
    />
    <VInput
      v-model="state.email"
      :validation="error?.status ?
        { $error: true, $errors: [{ $message: error.message }] } : v$.email"
      variant="custom"
      icon="mail"
      placeholder="Email Address"
    />
    <VInput
      v-model="state.password"
      :validation="v$.password"
      type="password"
      icon="lock"
      variant="customPassword"
      placeholder="Password"
    />
    <VInput
      v-model="state.confirmPassword"
      :validation="v$.confirmPassword"
      type="password"
      icon="lock"
      variant="customPassword"
      placeholder="Confirm Password"
    />
    <div class="flex flex-col gap-5 w-full">
      <VCheckbox
        text="Remember me"
        class="text-auth"
      />
      <VButton
        text="SIGN UP"
        type="submit"
        size="full"
        :loader="loading"
        text-auth-btn
      />
      <VButton
        text="Already have an account?"
        size="fit"
        variant="link"
        class="text-auth"
        @click="changeForm"
      />
    </div>
  </form>
</template>
