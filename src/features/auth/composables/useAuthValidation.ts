import { useVuelidate } from "@vuelidate/core";
import { reactive, computed } from "vue";

import { emailRules, nameRules, passwordRules } from "@/features/auth/utils/validationRules";

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
  });

  const rules = computed(() => ({
    name: nameRules,
    email: emailRules,
    password: passwordRules,
  }));

  const v$ = useVuelidate(rules, state);

  return { state, v$ };
};
