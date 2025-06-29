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
  category?: string;
}

export interface City {
  id: string;
  name: {
    en: string;
    ka: string;
  };
}

export interface CityPart {
  id: string;
  name: {
    en: string;
    ka: string;
  };
}

export interface SearchParams {
  location?: string;
  city?: string;
  category?: string;
  job?: string;
}

export interface FiltrationState {
  showJobs: boolean;
  serviceDialogOpen: boolean;
  locationDialogOpen: boolean;
  selectedCityId: string | null;
  showCityParts: boolean;
} 