const tailwindColors = [
  "bg-[#4285F4]", // Google Blue
  "bg-[#34A853]", // Google Green
  "bg-[#FBBC05]", // Google Yellow
  "bg-[#EA4335]", // Google Red
  "bg-[#673AB7]", // Deep Purple
  "bg-[#00ACC1]", // Cyan
  "bg-[#FF7043]", // Deep Orange
  "bg-[#78909C]", // Blue Grey
];

export const getInitials = (name: string): string => {
  if (!name) return "";

  const names = name.trim().split(" ");

  if (names.length === 1) return names[0].charAt(0).toUpperCase();

  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

export const getAvatarColor = (name: string): string => {
  const charSum = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = charSum % tailwindColors.length;

  return tailwindColors[index];
};
