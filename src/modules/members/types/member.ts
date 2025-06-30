export interface SearchParams {
  search?: string;
  cityId?: string;
  cityPartId?: string;
  categoryId?: string;
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
