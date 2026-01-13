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
