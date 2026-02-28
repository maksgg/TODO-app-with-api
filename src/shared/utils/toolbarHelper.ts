import { FilterConfig, SelectOption } from "../types";

export const getMappedFilters = (
  config: FilterConfig, payload: Record<string, string | number>,
) => {
  return config.reduce((acc, item) => {
    const selectedValue = payload[item.key];
    const option = item.options.find((o: SelectOption) => o.value === selectedValue);

    acc[item.key] = option || item.options[0];
    return acc;
  }, {} as Record<string, SelectOption>);
};

export const extractFilterValues = (
  newValues: Record<string, SelectOption>,
): Record<string, string> => {
  const updatedPayload: Record<string, string> = {};

  Object.keys(newValues).forEach((key) => {
    const option = newValues[key];
    if (option && typeof option.value !== "undefined") {
      updatedPayload[key] = option.value;
    }
  });

  return updatedPayload;
};
