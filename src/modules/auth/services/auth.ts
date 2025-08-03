import instance from "@/lib/axios";
import type { AxiosError } from "axios";

export const signIn = async (email: string, password: string) => {
  const response = await instance.post("/api/auth/login", {
    email,
    password,
  });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Login failed");
};

export const signUp = async (
  fullName: string,
  email: string,
  password: string,
  phone: string,
  role: string
) => {
  const response = await instance.post("/api/auth/register", {
    fullName,
    email,
    password,
    phone,
    role,
  });
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to register");
};

export const signOut = async () => {
  const response = await instance.post("/api/auth/logout");
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to logout");
};

export const getUserId = async () => {
  try {
    const response = await instance.get("/api/auth/me");
    return response.data.user;
  } catch (err) {
    const error = err as AxiosError;

    if (error?.response?.status === 401 || error?.response?.status === 403) {
      return null; // Not authenticated — no need to crash
    }

    console.error("❌ Unexpected error in getUser:", error);
    throw error; // Something else (network/server)
  }
};

export const getUser = async () => {
  const response = await instance.get("/api/auth/me", {
    headers: { "x-requires-auth": "true" },
  });
  return response.data.user;
};
