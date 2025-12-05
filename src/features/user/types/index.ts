type UserResponse = {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
};

type UserProfileData = {
  name: string;
  email: string;
};

export type {
  UserResponse,
  UserProfileData,
};
