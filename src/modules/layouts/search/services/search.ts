import instance from "@/lib/axios";

export const searchMastersByNames = async (q: string, limit?: number) => {
  try {
    const params = new URLSearchParams();
    params.append('q', q);
    if (limit) {
      params.append('limit', limit.toString());
    }
    
    const response = await instance.get(
      `/api/search/masters/search-bar?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
