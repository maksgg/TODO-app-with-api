<script setup lang="ts">
import { toast } from "vue-sonner";

import useAuthRequests from "@/features/auth/api/useAuthRequests";
import { useRegisterFormValidation } from "@/features/auth/composables/useAuthValidation";
import type { AuthFormType } from "@/features/auth/types/index";
import VButton from "@/shared/ui/common/VButton.vue";
import VInput from "@/shared/ui/common/VInput.vue";

const { state, v$ } = useRegisterFormValidation();

const { fetchRegisterUser } = useAuthRequests();

const { loading, error, execute } = fetchRegisterUser({
  onSuccess: () => {
    toast.success("Success registration");
    emit("toggle", "login");
  },
});

const request = async () => await execute({ data: state });

const submitForm = async () => {
  const validate = await v$.value.$validate();

  if(!validate) return;

  await request();
};

const emit = defineEmits<{ "toggle" : [AuthFormType] }>();

const changeForm = () => emit("toggle", "login");
</script>

<template>
  <form
    class="flex flex-col items-center gap-9 p-5 pt-10 pb-10
    rounded-xl min-w-[37.5rem] text-text-color"
    @submit.prevent="submitForm"
  >
    <h1>Welcome</h1>
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
    <div class="flex justify-around gap-10 w-full">
      <VButton
        text="BACK TO LOGIN"
        size="full"
        class="text-xl"
        @click="changeForm"
      />
      <VButton
        text="REGISTER NOW"
        type="submit"
        size="full"
        :loader="loading"
        class="text-xl"
      />
    </div>
  </form>
</template>
