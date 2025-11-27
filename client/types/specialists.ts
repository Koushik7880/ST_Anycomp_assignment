// src/types/specialists.ts

export type VerificationStatus = "pending" | "approved" | "rejected" | string;

export interface Media {
  id: string;
  specialist_id: string;
  file_name: string;
  file_size: number;
  display_order: number;
  mime_type: string;
  media_type: string;
  uploaded_at: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ServiceOffering {
  id: string;
  specialist_id: string;
  created_at: string;
  updated_at: string;
}

export interface Specialist {
  id: string;
  average_rating: number;
  is_draft: boolean;
  total_number_of_ratings: number;
  title: string;
  slug: string;
  description: string;
  base_price: number;
  platform_fee: number;
  final_price: number;
  verification_status: VerificationStatus;
  is_verified: boolean;
  duration_days: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  service_offerings?: ServiceOffering[];
  media?: Media[];
}

export interface SpecialistsListResponse {
  success: boolean;
  data: Specialist[];
  meta: {
    totalCount: number;
    totalPages: number;
    page: number;
    limit: number;
  };
}
