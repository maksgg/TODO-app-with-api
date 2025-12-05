<script setup lang="ts">
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

import  useAuthRequests  from "@/features/auth/api/useAuthRequests";
import { useLoginFormValidation } from "@/features/auth/composables/useAuthValidation";
import type { AuthFormType } from "@/features/auth/types/index";
import VButton from "@/shared/ui/common/VButton.vue";
import VInput from "@/shared/ui/common/VInput.vue";

const router = useRouter();

const { state, v$ } = useLoginFormValidation();

const { fetchLoginUser } = useAuthRequests();

const { loading, error, execute } = fetchLoginUser({
  onSuccess: ({ data }) => {
    toast.success("Success");
    localStorage.setItem("accessToken", data.accessToken);
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
    class="flex flex-col items-center gap-5 p-5 pt-10 pb-10
    rounded-xl min-w-[37.5rem] text-text-color"
    @submit.prevent="submitForm"
  >
    <h1 class="text-login leading-none mb-[25px]">
      Login
    </h1>
    <VInput
      v-model="state.email"
      :validation="v$.email"
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
      @input="error = null"
    />
    <VButton
      text="SIGN IN"
      type="submit"
      size="full"
      :loader="loading"
      class="text-4xl"
    />
    <span class="text-red-500 text-xl h-[1rem]">
      {{ !!error ? error?.message : "" }}
    </span>
    <div class="flex justify-between w-full mt-[25px]">
      <VButton
        text="Create new account"
        variant="link"
        size="fit"
        @click="changeForm"
      />
      <span class="cursor-pointer">
        Forgot password?
      </span>
    </div>
  </form>
</template>
