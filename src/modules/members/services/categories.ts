import instance from "@/lib/axios";

export const getCategories = async () => {
  const response = await instance.get("/api/categories");
  if (response.status !== 200) {
    throw new Error("Failed to fetch categories");
  }
  return response.data;
};

export const getJobsByCategoryId = async (categoryId: string) => {
  const response = await instance.get(`/api/categories/${categoryId}/jobs`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch jobs");
  }
  return response.data;
};
