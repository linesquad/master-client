import instance from "@/lib/axios";

export const getPopularMasters = async (limit: number) => {
  try {
    const response = await instance.get(
      `/api/search/masters/popular?limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
