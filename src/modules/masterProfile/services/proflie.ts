import instance from "@/lib/axios";

export const getMasterProfile = async (id: string) => {
  const response = await instance.get(`/api/public/${id}`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch master profile");
  }
  return response.data;
};
