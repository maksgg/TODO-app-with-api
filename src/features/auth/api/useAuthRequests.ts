import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/features/auth/types/index";
import type { UseApiOptions } from "@/shared/api/types";
import { useApiPost } from "@/shared/composables";

export default () => {
  const fetchLoginUser = (options?: UseApiOptions<LoginResponse, LoginRequest>) => {
    return useApiPost("/auth/login", options);
  };

  const fetchRegisterUser = (options?: UseApiOptions<RegisterResponse, RegisterRequest>) => {
    return useApiPost("/auth/register", options);
  };

  return {
    fetchLoginUser,
    fetchRegisterUser,
  };
};
