<script setup lang="ts">
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

import  useAuthRequests  from "@/features/auth/api/useAuthRequests";
import { useLoginFormValidation } from "@/features/auth/composables/useAuthValidation";
import type { AuthFormType } from "@/features/auth/types/index";
import { tokenManager } from "@/shared/api/tokenManager";
import VButton from "@/shared/ui/common/VButton.vue";
import VCheckbox from "@/shared/ui/common/VCheckbox.vue";
import VInput from "@/shared/ui/common/VInput.vue";

const router = useRouter();

const { state, v$ } = useLoginFormValidation();

const { fetchLoginUser } = useAuthRequests();

const { loading, error, execute } = fetchLoginUser({
  onSuccess: ({ data }) => {
    toast.success("Success");
    tokenManager.setTokens({ accessToken: data.accessToken });
    router.push("/");
  },
});

const request = async () => await execute({ data: state });

const submitForm = async () => {
  const validate = await v$.value.$validate();

  if(!validate) return;

  await request();
};

const emit = defineEmits<{ "toggle" : [AuthFormType] }>();

const changeForm = () => emit("toggle", "register");
</script>

<template>
  <form
    class="flex flex-col items-center gap-5
    rounded-xl w-[24rem] text-text-color"
    @submit.prevent="submitForm"
  >
    <h1 class="text-login leading-none mb-[25px]">
      Login
    </h1>
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
      :validation="error?.status ?
        { $error: true, $errors: [{ $message: error.message }] } : v$.password"
      type="password"
      icon="lock"
      variant="customPassword"
      placeholder="Password"
      @input="error = null"
    />
    <div class="flex flex-col w-full gap-5">
      <VCheckbox
        text="Remember me"
        class="text-auth"
      />
      <VButton
        text="SIGN IN"
        type="submit"
        size="full"
        :loader="loading"
        class="text-auth-btn"
      />
    </div>
    <div class="flex justify-between w-full mt-[1rem]">
      <VButton
        text="Create new account"
        variant="link"
        size="fit"
        class="text-auth"
        @click="changeForm"
      />
      <span class="cursor-pointer text-auth">
        Forgot password?
      </span>
    </div>
  </form>
</template>
