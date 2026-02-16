import type { Task } from "../types";

export const groupTasksByStatus = (tasks: Task[] = []) => {
  const initial = { pending: [] as Task[], completed: [] as Task[] };

  return tasks.reduce((acc, task) => {
    if (task.status === "done") {
      acc.completed.push(task);
    } else {
      acc.pending.push(task);
    }
    return acc;
  }, initial);
};
