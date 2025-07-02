export interface SearchParams {
  search?: string;
  cityId?: string;
  cityPartId?: string;
  categoryId?: string;
  jobId?: string;
  availability?: string;
  hasReviews?: string;
  minPrice?: string;
  maxPrice?: string;
  minRating?: string;
  sortBy?: string;
  page?: string;
  limit?: string;
}

export interface Master {
  id: string;
  fullName: string;
  city: string;
  imageUrl: string;
  availability: string;
  avgRating: string;
  reviewCount: string;
  createdAt: string;
}
// interface SearchParams {
//   cityPartId?: string;
//   cityId?: string;
//   categoryId?: string;
//   jobId?: string;
// }

export interface Category {
  id: string;
  name: {
    en: string;
    ka: string;
    ru: string;
  };
}

export interface Job {
  id: string;
  title: {
    en: string;
    ka: string;
    ru: string;
  };
  description?: {
    en: string;
    ka: string;
    ru: string;
  };
  location?: string;
}

export interface City {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface CityPart {
  id: string;
  name: string;
}