import { required, email, minLength, helpers } from "@vuelidate/validators";

export const nameRules = {
  required: helpers.withMessage("Write your name", required),
  minLength: helpers.withMessage("Name should be at least 5 letters", minLength(5)),
};

export const emailRules = {
  required: helpers.withMessage("Write email.", required),
  email: helpers.withMessage("Please write real email", email),
};

export const passwordRules = {
  required: helpers.withMessage("Write password", required),
  minLength: helpers.withMessage("Password need to be 8 symbols", minLength(8)),
};
