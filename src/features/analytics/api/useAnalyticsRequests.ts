import { useApiGet, type UseApiOptions } from "@ametie/vue-muza-use";

import type {
  AnalyticsResponse,
  TagsResponse,
  PriorityResponse,
  DailyActivityResponse,
} from "../types";

export default () => {
  const fetchSummaryAnalytics = (
    options?: UseApiOptions<AnalyticsResponse>,
  ) => {
    return useApiGet("/analytics/summary", options);
  };

  const fetchTagsAnalytics = (
    options?: UseApiOptions<TagsResponse[]>,
  ) => {
    return useApiGet("/analytics/popular-tags", options);
  };

  const fetchPriorityAnalytics = (
    options?: UseApiOptions<PriorityResponse[]>,
  ) => {
    return useApiGet("/analytics/tasks-by-priority", options);
  };

  const fetchDailyActivityAnalytics = (
    options?: UseApiOptions<DailyActivityResponse[]>,
  ) => {
    return useApiGet("/analytics/daily-activity", options);
  };

  return {
    fetchSummaryAnalytics,
    fetchTagsAnalytics,
    fetchPriorityAnalytics,
    fetchDailyActivityAnalytics,
  };
};
