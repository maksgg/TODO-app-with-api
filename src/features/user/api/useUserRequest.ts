import type { UserResponse } from "@/features/user/types/index";
import type { UseApiOptions } from "@/shared/api/types";
import { useApiGet, useApiPatch } from "@/shared/composables";

export default () => {
  const fetchOwnProfile = (options?: UseApiOptions<UserResponse>) => {
    return useApiGet("/me", options);
  };
  const fetchUpdateOwnProfile = (options?: UseApiOptions<UserResponse>) => {
    return useApiPatch("/me", options);
  };

  return {
    fetchOwnProfile,
    fetchUpdateOwnProfile,
  };
};
