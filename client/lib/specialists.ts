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

// Backend base path is /api, so only use /specialists here
const SPECIALISTS_BASE = "/specialists";

/**
 * Admin table list
 */
export async function fetchSpecialists(params: {
  status?: SpecialistsStatusFilter;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<SpecialistsListResponse> {
  const { status = "published", search = "", page = 1, limit = 10 } = params;

  const res = await api.get<SpecialistsListResponse>(SPECIALISTS_BASE, {
    params: { status, search, page, limit },
  });

  return res.data;
}

/**
 * Public list
 */
export async function fetchPublishedSpecialists(page = 1, limit = 20) {
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
 * Create specialist
 */
export async function createSpecialist(formData: FormData) {
  const res = await api.post(SPECIALISTS_BASE, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

/**
 * Update specialist
 */
export async function updateSpecialist(id: string, formData: FormData) {
  const res = await api.put(`${SPECIALISTS_BASE}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

/**
 * Delete specialist
 */
export async function deleteSpecialist(id: string) {
  await api.delete(`${SPECIALISTS_BASE}/${id}`);
}

/**
 * Export specialists
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
