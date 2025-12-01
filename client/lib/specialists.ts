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

// 👇 All backend calls for specialists use this base
const SPECIALISTS_BASE = "/api/specialists";

/**
 * Admin table list
 */
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

  const res = await api.get<SpecialistsListResponse>(SPECIALISTS_BASE, {
    params: { status, search, page, limit },
  });

  // backend is expected to respond with { data, meta }
  return res.data;
}

/**
 * Public / store-front list of specialists.
 * Returns flattened helper shape.
 */
export async function fetchPublishedSpecialists(
  page = 1,
  limit = 20
): Promise<{ data: Specialist[]; totalCount: number; totalPages: number }> {
  const res = await api.get<SpecialistsListResponse>(SPECIALISTS_BASE, {
    params: {
      status: "published",
      search: "",
      page,
      limit,
    },
  });

  return {
    data: res.data.data,
    totalCount: res.data.meta.totalCount,
    totalPages: res.data.meta.totalPages,
  };
}

/**
 * Create new specialist
 */
export async function createSpecialist(formData: FormData): Promise<Specialist> {
  const res = await api.post<Specialist>(SPECIALISTS_BASE, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

/**
 * Update existing specialist
 */
export async function updateSpecialist(
  id: string,
  formData: FormData
): Promise<Specialist> {
  const res = await api.put<Specialist>(`${SPECIALISTS_BASE}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

/**
 * Delete specialist
 */
export async function deleteSpecialist(id: string): Promise<void> {
  await api.delete(`${SPECIALISTS_BASE}/${id}`);
}

/**
 * Export specialists to CSV/Excel (if you use this route)
 */
export async function exportSpecialists(params: {
  status?: SpecialistsStatusFilter;
  search?: string;
}) {
  const { status = "all", search = "" } = params;

  const res = await api.get(`${SPECIALISTS_BASE}/export`, {
    params: { status, search },
    responseType: "blob",
  });

  return res.data;
}
