export const getDateParams = (mode: string) => {
  const now = new Date();
  const endDate = now.toISOString().split("T")[0];
  const start = new Date();

  if (mode === "week") {
    start.setDate(now.getDate() - 7);
  }
  if (mode === "month") {
    start.setMonth(now.getMonth() - 1);
  }

  return {
    startDate: start.toISOString().split("T")[0],
    endDate,
  };
};
