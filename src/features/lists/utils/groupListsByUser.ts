import type { AllListResponse, UserGroupInfo } from "../types/index";

export const groupListsByUser = (data: AllListResponse["data"] | undefined): UserGroupInfo[] => {
  if (!data || data.length === 0) return [];

  const groupsMap = new Map<string, UserGroupInfo>();

  for (const list of data) {
    const owner = list.owner;

    if (!owner || !owner.email) continue;
    const email = owner.email;

    if (!groupsMap.has(email)) {
      groupsMap.set(email, {
        isExpanded: false,
        totalLists: 0,
        userListsInfo: {
          ownerId: owner.id,
          name: owner.name,
          email: email,
          role: owner.role,
          allTitles: [],
        },
      });
    }
    const group = groupsMap.get(email)!;

    group.userListsInfo.allTitles.push({
      listId: list._id,
      title: list.title,
      totalTasks: list.totalTasks,
    });

    group.totalLists = group.userListsInfo.allTitles.length;
  }

  return Array.from(groupsMap.values());
};
