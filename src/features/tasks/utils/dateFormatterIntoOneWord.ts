export const dateFormatterIntoOneWord = (dateStr: string | null): string => {
  if (!dateStr) return "";

  const date = new Date(dateStr);
  const now = new Date();

  // Скидаємо час до 00:00:00 для чистого порівняння днів
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  // Різниця в мілісекундах, переведена в дні
  const diffTime = startOfDate.getTime() - startOfToday.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "Overdue";
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";

  // Логіка тижнів
  if (diffDays > 1 && diffDays <= 7) return "This week";
  if (diffDays > 7 && diffDays <= 14) return "Next week";

  // Якщо дата ще далі
  return "Later";
};
