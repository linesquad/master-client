export interface TranslatedText {
  en?: string;
  ka?: string;
  ru?: string;
}

export interface QuestionAnswer {
  question: string | TranslatedText;
  answer: string | TranslatedText;
}
export interface MasterProfileData {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  city: string;
  bio?: string;
  imageUrl?: string;
  availability: string;
  memberSince: string;
  profileUpdatedAt: string;
  questionsAndAnswers?: QuestionAnswer[];
  works?: Work[];
  certificates?: Certificate[];
  summary?: {
    totalWorks?: number;
    totalReviews?: number;
    totalCertificates?: number;
    profileCompleteness?: number;
  };
  points?: {
    total?: number;
  };
  reviews?: {
    statistics?: {
      totalReviews: number;
      averageRatings: {
        overall: number;
        price: number;
        quality: number;
        punctuality: number;
        experience: number;
      };
    };
    recent?: Review[];
  };
}
export interface Review {
  id: string;
  comment: string;
  createdAt: string;
  ratings: {
    average: number;
    price: number;
    quality: number;
    punctuality: number;
    experience: number;
  };
  hasReply?: boolean;
  masterReply?: string;
}

export interface Certificate {
  id: string;
  title: string | TranslatedText;
  issuedBy?: string | TranslatedText;
  uploadedAt: string;
  imageUrl?: string;
}

export interface Work {
  id: string;
  category?: {
    id: string;
    name: TranslatedText;
  };
  createdAt: string;
  description: TranslatedText;
  duration?: number;
  jobInfo?: {
    id: string;
    description: TranslatedText;
    title: TranslatedText;
  };
  note?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  imageUrl?: string;
}
