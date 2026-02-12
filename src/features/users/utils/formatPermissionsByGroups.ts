import { Permissions } from "@/shared/types";

export const CATEGORY_MAP: Record<string, number> = {
  list: 0,
  "all-lists": 0,
  task: 1,
  "all-tasks": 1,
  user: 2,
  users: 2,
  roles: 2,
  permissions: 2,
  dashboard: 3,
  analytics: 3,
};

type PermissionGroup = {
  group: string;
  items: Permissions[];
};

export const formatPermissionsByGroups = (permissions: Permissions[] | null): PermissionGroup[] => {
  if (!permissions?.length) return [];

  const groups: PermissionGroup[] = [
    { group: "Lists permissions", items: [] },
    { group: "Tasks permissions", items: [] },
    { group: "User management", items: [] },
    { group: "Analytics & dashboard", items: [] },
  ];

  permissions.forEach((item) => {
    const idx = CATEGORY_MAP[item.category];
    if (idx !== undefined && groups[idx]) {
      groups[idx].items.push(item);
    }
  });

  // Фільтруємо групи, які залишилися порожніми (опціонально, але корисно для UX)
  return groups.filter((g) => g.items.length > 0);
};
