import type { UseApiOptions } from "@/shared/api/types";
import { useApiPatch } from "@/shared/composables";

export default () => {
  const updateOwnProfile = (options?: UseApiOptions<{ name: string }>) => {
    return useApiPatch("/me", options);
  };

  return {
    updateOwnProfile,
  };
};
