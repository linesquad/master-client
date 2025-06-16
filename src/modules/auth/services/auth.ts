import instance from "@/lib/axios";

export const signIn = async (email: string,password: string) => {
  try {
    const response = await instance.post("/api/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (fullName: string, email: string, password: string, phone: string, role: string) => {
  try {
    const response = await instance.post("/api/auth/register", {
      fullName,
      email,
      password,
      phone,
      role
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserId = async () => {
  try {
    const response = await instance.get("/api/auth/me");
    return response.data.user.id;
  } catch (error) {
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await instance.get("/api/auth/me");
    return response.data.user;
  } catch (error) {
    throw error;
  }
};