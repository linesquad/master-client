export interface CategoryName {
  en: string;
  ka: string;
  ru: string;
}

export interface MasterInfo {
  fullName: string;
  imageUrl: string;
  city: string;
}

export interface Lead {
  id: string;
  status: string;
  location: string;
  message: string;
  price: string | null;
  categoryName: CategoryName;
  completedAt: string | null;
  createdAt: string;
  jobTitle: CategoryName;
  masterId: string;
  masterInfo: MasterInfo;
  masterJobId: string;
  requestedTime: string;
}

export interface Pagination {
  limit: string;
  page: string;
  pages: number;
  total: number;
}

export interface ClientLeadsResponse {
  success: boolean;
  data: {
    leads: Lead[];
    pagination: Pagination;
  };
}

export interface LeadReview {
  jobTitle: CategoryName;
  price: string;
  location: string;
}

export interface MasterReview {
  fullName: string;
  imageUrl: string;
  city: string;
}

export interface Review {
  id: string;
  leadId: string;
  averageRating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  hasReply: boolean;
  lead: LeadReview;
  master: MasterReview;
  masterReply: string | null;
  ratingExperience: number;
  ratingPrice: number;
  ratingPunctuality: number;
  ratingQuality: number;
  status: string;
}

export interface ClientReviewsResponse {
  success: boolean;
  data: {
    reviews: Review[];
    pagination: Pagination;
  };
}
