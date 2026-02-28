import { i18n } from "@/shared/composables/useI18n";
import type { Permissions } from "@/shared/types";

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
    { group: i18n.global.t("usersInfo.permissions.lists_permissions"), items: [] },
    { group: i18n.global.t("usersInfo.permissions.tasks_permissions"), items: [] },
    { group: i18n.global.t("usersInfo.permissions.user_management"), items: [] },
    { group: i18n.global.t("usersInfo.permissions.analytics_&_dashboard"), items: [] },
  ];

  permissions.forEach((item) => {
    const idx = CATEGORY_MAP[item.category];
    if (idx !== undefined && groups[idx]) {
      groups[idx].items.push(item);
    }
  });

  return groups.filter((g) => g.items.length > 0);
};
