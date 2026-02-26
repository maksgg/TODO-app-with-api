export const tagsFormatter = (str: string): string[] => {
  if (!str) return [];
  return str
    .split(/[ ,;]+/)
    .filter((tag) => tag.trim().length > 0);
};
