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

export type {
  ListAnalytics,
  TaskAnalytics,
  AnalyticsResponse,
};
