import { required, email, minLength, helpers, sameAs } from "@vuelidate/validators";
import { useI18n } from "vue-i18n";

export default () => {
  const { t } = useI18n();

  const nameRules = {
    required: helpers.withMessage(() => t("auth.errorMsg.write_your_name"), required),
    minLength: helpers.withMessage(() => t("auth.errorMsg.name_should_be_at_least_5_letters"), minLength(5)),
  };

  const emailRules = {
    required: helpers.withMessage(() => t("auth.errorMsg.write_email"), required),
    email: helpers.withMessage(() => t("auth.errorMsg.please_write_real_email"), email),
  };

  const passwordRules = {
    required: helpers.withMessage(() => t("auth.errorMsg.write_password"), required),
    minLength: helpers.withMessage(() => t("auth.errorMsg.password_need_to_be_8_symbols"), minLength(8)),
  };

  const confirmPasswordRules = (passwordState: string) => ({
    required: helpers.withMessage(() => t("auth.errorMsg.repeat_password"), required),
    sameAs: helpers.withMessage(() => t("auth.errorMsg.passwords_must_match"), sameAs(passwordState)),
  });

  return {
    nameRules,
    emailRules,
    passwordRules,
    confirmPasswordRules,
  };
};
