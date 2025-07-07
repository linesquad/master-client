import instance from "@/lib/axios";

export const getMasterProfile = async (id: string) => {
  try {
    const response = await instance.get(`/api/public/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
