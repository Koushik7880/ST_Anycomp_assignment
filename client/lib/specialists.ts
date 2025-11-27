// src/lib/specialists.ts
import { api } from "./api";
import { SpecialistsListResponse, Specialist } from "@/types/specialists";

export type SpecialistsStatusFilter = "all" | "draft" | "published";

export async function fetchSpecialists(params: {
  status?: SpecialistsStatusFilter;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<SpecialistsListResponse> {
  const { status = "published", search = "", page = 1, limit = 10 } = params;

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
