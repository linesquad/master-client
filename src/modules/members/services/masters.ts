import instance from "@/lib/axios";

interface SearchMasterParams {
  search?: string;
  city?: string;
  cityPart?: string;
  categoryId?: string;
  availability?: string;
  minRating?: number;
  sortBy?: string;
  page?: number;
  limit?: number;
}

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

export const searchMasters = async (params?: SearchMasterParams) => {
  try {
    // Build query string from parameters
    const queryParams = new URLSearchParams();
    
    if (params?.search) queryParams.append('search', params.search);
    if (params?.city) queryParams.append('city', params.city);
    if (params?.cityPart) queryParams.append('cityPart', params.cityPart);
    if (params?.categoryId) queryParams.append('categoryId', params.categoryId);
    if (params?.availability) queryParams.append('availability', params.availability);
    if (params?.minRating) queryParams.append('minRating', params.minRating.toString());
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const url = `/api/search/masters${queryString ? `?${queryString}` : ''}`;
    
    const response = await instance.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
