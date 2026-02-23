type ListAnalytics = {
  total: number;
};

type TaskAnalytics = {
  total: number;
  completed: number;
  archived: number;
  todo: number;
  inProgress: number;
};

type AnalyticsResponse = {
  lists: ListAnalytics;
  tasks: TaskAnalytics;
};

type TagsResponse = {
  tag: string;
  count: number;
};

type PriorityResponse = {
  priority: string;
  count: number;
};
type DailyActivityResponse = {
  date: string;
  created: number;
  completed: number;
};

export type {
  ListAnalytics,
  TaskAnalytics,
  AnalyticsResponse,
  TagsResponse,
  PriorityResponse,
  DailyActivityResponse,
};
