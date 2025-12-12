import { useVuelidate } from "@vuelidate/core";
import { reactive, computed } from "vue";

import { emailRules, nameRules, passwordRules, confirmPasswordRules } from "@/features/auth/utils/validationRules";

export const useLoginFormValidation = () => {
  const state = reactive({
    email: "",
    password: "",
  });

  const rules = computed(() => ({
    email: emailRules,
    password: passwordRules,
  }));

  const v$ = useVuelidate(rules, state);

  return { state, v$ };
};

export const useRegisterFormValidation = () => {
  const state = reactive({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const rules = computed(() => ({
    name: nameRules,
    email: emailRules,
    password: passwordRules,
    confirmPassword: confirmPasswordRules(state.password),
  }));

  const mainRequestState = () => {
    // eslint-disable-next-line
    const { confirmPassword, ...rest } = state;

    return rest;
  };

  const v$ = useVuelidate(rules, state);

  return { state, v$, mainRequestState };
};
