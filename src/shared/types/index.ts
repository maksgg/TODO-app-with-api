type UserProfileData = {
  name: string;
  email: string;
  role: string;
};

type UserInfo = {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  permissions: string[];
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
};

type Pagination = {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
};

type Response<T, D> = {
  data: T[];
  pagination: D;
};

type AdminResponse = Response<UserInfo, Pagination>;

type TableParams = {
  searchField?: string;
  sort?: string;
  role?: "all" | "user" | "admin";
  order?: "asc" | "desc";
  hasMore?: boolean;
  limit?: number;
  q?: string;
};

type UserRole = {
  role: "user" | "admin";
};

type Roles = {
  name: string;
  value: "user" | "admin";
};

type UserPermissions = {
  permissions: string[];
};
type PermissionsByRole = {
  USER: string[];
  ADMIN: string[];
};

type Permissions = {
  key: string;
  value: string;
  category: string;
  description: string;
};

type Tabs = {
  id: string;
  label: string;
};

type UserPayload = {
  role: "user" | "admin";
  permissions: string[];
};

type DateVariant = "short" | "long";

export type {
  UserProfileData,
  UserInfo,
  AdminResponse,
  TableParams,
  UserRole,
  UserPermissions,
  PermissionsByRole,
  Permissions,
  Roles,
  Tabs,
  UserPayload,
  Response,
  Pagination,
  DateVariant,
};

