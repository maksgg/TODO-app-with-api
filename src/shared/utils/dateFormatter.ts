import { DateVariant } from "../types";

export const formatDate = (isoString: string, variant: DateVariant): string => {
  const date = new Date(isoString);
  const options: Record<DateVariant, Intl.DateTimeFormatOptions> = {
    short: {
      month: "long",
      year: "numeric",
    },
    long: {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  };

  return date.toLocaleDateString("en-GB", options[variant]);
};

/**
 * Форматує дату у рядок YYYY-MM-DD
 * @param date - Об'єкт Date, рядок або число
 */
export const formatDateForRequest = (date: Date | string | number): string => {
  const d = new Date(date);

  // Перевірка на валідність дати
  if (isNaN(d.getTime())) return "";

  const year = d.getFullYear();
  // Місяці в JS починаються з 0, тому додаємо 1
  // padStart(2, '0') додає нуль попереду, якщо число менше 10
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
