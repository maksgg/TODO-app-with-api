/**
 * Отримує значення CSS-змінної з кореневого елемента документа (:root).
 * Використовується для синхронізації JS-компонентів (наприклад, графіків ECharts)
 * з темою Tailwind CSS.
 * * @param name - Назва кольору без префікса `--color-`. Наприклад: 'primary', 'success'.
 * @returns Рядок із значенням кольору (hex, rgb або hsl). Якщо змінну не знайдено, повертає порожній рядок.
 * * @example
 * const primaryColor = getThemeColor('primary'); // повертає '#476FFF'
 */
export const getThemeColor = (name: string, fallback = ""): string => {
  if (typeof window === "undefined") return fallback;

  const color = getComputedStyle(document.documentElement)
    .getPropertyValue(`--color-${name}`)
    .trim();

  return color || fallback;
};
