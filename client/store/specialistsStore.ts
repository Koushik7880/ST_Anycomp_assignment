// src/store/specialistsStore.ts
"use client";

import { create } from "zustand";
import { SpecialistsStatusFilter } from "@/lib/specialists";
import { Specialist } from "@/types/specialists";

interface SpecialistsState {
  status: SpecialistsStatusFilter;
  search: string;
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  specialists: Specialist[];
  setStatus: (status: SpecialistsStatusFilter) => void;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setData: (payload: {
    specialists: Specialist[];
    totalCount: number;
    totalPages: number;
  }) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useSpecialistsStore = create<SpecialistsState>((set) => ({
  status: "published",
  search: "",
  page: 1,
  limit: 10,
  totalCount: 0,
  totalPages: 0,
  loading: false,
  error: null,
  specialists: [],
  setStatus: (status) => set({ status, page: 1 }),
  setSearch: (search) => set({ search, page: 1 }),
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit, page: 1 }),
  setData: ({ specialists, totalCount, totalPages }) =>
    set({ specialists, totalCount, totalPages }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
