export const firstLetterUp = (text: string) => {
  if (!text) return "";

  const stringText = String(text);

  return stringText.charAt(0).toUpperCase() + text.slice(1);
};
