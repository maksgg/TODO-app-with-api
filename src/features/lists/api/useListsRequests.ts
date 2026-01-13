import type {
  AllListResponse,
  CreateListRequest,
  CreateListResponse,
  AnalyticsResponse,
} from "../types";

import type { UseApiOptions } from "@/shared/api/types";
import { useApiGet, useApiPost } from "@/shared/composables";

export default () => {
  const createUserList = (options?: UseApiOptions<CreateListResponse, CreateListRequest>) => {
    return useApiPost("/lists", options);
  };
  const fetchAllUserLists = (options?: UseApiOptions<AllListResponse>) => {
    return useApiGet("/lists", options);
  };

  const fetchAnalytics = (options?: UseApiOptions<AnalyticsResponse>) => {
    return useApiGet("/analytics/summary", options);
  };

  return {
    createUserList,
    fetchAllUserLists,
    fetchAnalytics,
  };
};
