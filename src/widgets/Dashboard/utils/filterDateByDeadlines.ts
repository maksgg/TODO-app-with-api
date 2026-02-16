import { Task, TasksDeadlinesResponse } from "@/features/tasks/types";

export const filterDeadlineTasks = (tasks: TasksDeadlinesResponse["data"] | undefined) => {
  const today: Task[] = [];
  const upcoming: Task[] = [];

  if (!tasks || !tasks.length) return { today, upcoming };

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const oneDayMs = 1000 * 60 * 60 * 24;

  // Calculate the end of the current week (Sunday)
  const currentDayOfWeek = now.getDay(); // 0 (Sun) - 6 (Sat)
  const daysUntilSunday = currentDayOfWeek === 0 ? 0 : 7 - currentDayOfWeek;
  const endOfWeekTimestamp = startOfToday + daysUntilSunday * oneDayMs;

  for (const task of tasks) {
    if (!task.dueDate) continue;

    const date = new Date(task.dueDate);
    const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    const diffDays = Math.round((startOfDate - startOfToday) / oneDayMs);

    // 1. Today and Overdue (no deadline words, showing status instead)
    if (diffDays <= 0) {
      today.push({ ...task });
      continue;
    }

    // 2. Upcoming tasks - assigning English deadline words
    let deadlineWord = "";

    if (diffDays === 1) {
      deadlineWord = "Tomorrow";
    } else if (diffDays === 2) {
      deadlineWord = "Day after tomorrow";
    } else if (startOfDate <= endOfWeekTimestamp) {
      deadlineWord = "This week";
    } else {
      deadlineWord = "Later";
    }

    upcoming.push({
      ...task,
      deadlineWord,
    });
  }

  return {
    today: today.slice(0, 5),
    upcoming: upcoming.slice(0, 5),
  };
};
