export interface Name {
  en: string;
  ka: string;
  ru: string;
}

export interface Category {
  id: string;
  name: Name;
  createdAt: string;
}

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
  count: number;
}
