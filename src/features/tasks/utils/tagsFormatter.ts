export const tagsFormatter = (str: string): string[] => {
  if (!str) return [];
  return str
    .split(/[ ,;]+/)            // Розбиваємо по будь-якій комбінації пробілів та ком
    .filter((tag) => tag.trim().length > 0); // Лишаємо тільки реальний текст
};
