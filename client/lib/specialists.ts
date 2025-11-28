// client/lib/specialists.ts
"use client";

import { api } from "@/lib/api";
import { Specialist } from "@/types/specialists";

export type SpecialistsStatusFilter = "all" | "draft" | "published";

export interface SpecialistsListResponse {
  data: Specialist[];
  meta: {
    totalCount: number;
    totalPages: number;
    page: number;
    limit: number;
  };
}

// Admin table list (you already had this – keep it)
export async function fetchSpecialists(params: {
  status?: SpecialistsStatusFilter;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<SpecialistsListResponse> {
  const {
    status = "published",
    search = "",
    page = 1,
    limit = 10,
  } = params;

  const res = await api.get<SpecialistsListResponse>("/specialists", {
    params: {
      status,
      search,
      page,
      limit,
    },
  });

  return res.data;
}

/**
 * Public / store-front list of specialists that the customer can buy.
 * Uses the same /specialists endpoint but forces `status = "published"`.
 */
export async function fetchPublishedSpecialists(
  page = 1,
  limit = 20
): Promise<{ data: Specialist[]; totalCount: number; totalPages: number }> {
  const res = await api.get("/specialists", {
    params: {
      status: "published",
      search: "",
      page,
      limit,
    },
  });

  return {
    data: res.data.data as Specialist[],
    totalCount: res.data.meta.totalCount,
    totalPages: res.data.meta.totalPages,
  };
}
