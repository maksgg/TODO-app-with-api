import { PriorityResponse } from "../types";

/**
 * Мапить пріоритети на кольори теми
 * @param data - масив даних з бекенду
 * @param theme - об'єкт з кольорами з chartTheme
 */
export const mapPriorityColors = (data: PriorityResponse[], theme: Record<string, string>) => {
  const priorityMap: Record<string, string> = {
    high: theme.dangerous,
    medium: theme.warning,
    low: theme.success,
  };

  return data.map((item) => {
    const key = String(item.priority).toLowerCase();
    return priorityMap[key];
  });
};
