export interface SearchParams {
  search?: string;
  cityId?: string;
  cityPartId?: string;
  categoryId?: string;
  jobId?: string;
  availability?: string;
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
  };
}

export interface Job {
  id: string;
  title: {
    en: string;
  };
  description?: {
    en: string;
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