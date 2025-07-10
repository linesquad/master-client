import instance from "@/lib/axios";

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
  const response = await instance.get("/api/auth/me");
  if (response.status === 200) {
    return response.data.user.id;
  }
  throw new Error("Failed to get user id");
};

export const getUser = async () => {
  const response = await instance.get("/api/auth/me");
  if (response.status === 200) {
    return response.data.user;
  }
  throw new Error("Failed to get user");
};
