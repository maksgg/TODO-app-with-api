type LoginRequest = {
  email: string;
  password: string
};

type LoginResponse = {
  accessToken: string;
};

type RegisterRequest = {
  name: string;
  email: string;
  password: string
};

type RegisterResponse = {
  email: string;
  name: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
};

type AuthFormType = "login" | "register";

export type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  AuthFormType,
};
