import instance from "@/lib/axios";

export const getCities = async () => {
  try {
    const response = await instance.get("/api/masters/cities");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCityById = async (id: string) => {
  try {
    const response = await instance.get(`/api/masters/cities/${id}/parts`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
