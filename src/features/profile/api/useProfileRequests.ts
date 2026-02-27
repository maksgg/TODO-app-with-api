import { useApiPatch, type UseApiOptions } from "@ametie/vue-muza-use";

import type { UserInfo } from "@/shared/types";

export default () => {
  const updateOwnProfile = (options?: UseApiOptions<UserInfo, Partial<UserInfo>>) => {
    return useApiPatch("/me", options);
  };

  return {
    updateOwnProfile,
  };
};
