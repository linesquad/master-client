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

export const signUp = async (fullname: string, email: string, password: string, phone: string) => {
  try {
    const response = await instance.post("/api/auth/register", {
      fullname,
      email,
      password,
      phone

    });
    return response.data;
  } catch (error) {
    throw error;
  }
};