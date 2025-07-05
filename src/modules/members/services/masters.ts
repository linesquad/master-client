import instance from "@/lib/axios";

interface SearchMasterParams {
  search?: string;
  city?: string;
  cityPart?: string;
  categoryId?: string;
  jobId?: string;
  availability?: string;
  hasReviews?: string;
  minPrice?: number;
  maxPrice?: number;
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
    const queryParams = new URLSearchParams();
    
    if (params?.search) queryParams.append('search', params.search);
    if (params?.city) queryParams.append('city', params.city);
    if (params?.cityPart) queryParams.append('cityPart', params.cityPart);
    if (params?.categoryId) queryParams.append('categoryId', params.categoryId);
    if (params?.jobId) queryParams.append('jobId', params.jobId);
    if (params?.availability) queryParams.append('availability', params.availability);
    if (params?.hasReviews) queryParams.append('hasReviews', params.hasReviews);
    if (params?.minPrice) queryParams.append('minPrice', params.minPrice.toString());
    if (params?.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());
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

export const createLead = async (
  masterJobId: string,
  message: string | undefined,
  location: string,
  requestedTime?: string
) => {
  try {
    const payload: any = {
      masterJobId,
      message,
      location,
    };
    
    // Only include requestedTime if it's provided, and format it as ISO string
    if (requestedTime) {
      payload.requestedTime = new Date(requestedTime).toISOString();
    }
    
    const response = await instance.post(`/api/leads`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
