// src/app/specialists/page.tsx
"use client";

import { useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SpecialistsFilters from "@/components/specialists/SpecialistsFilters";
import SpecialistsTable from "@/components/specialists/SpecialistsTable";
import { useSpecialistsStore } from "@/store/specialistsStore";
import { fetchSpecialists } from "@/lib/specialists";
import { api } from "@/lib/api";

export default function SpecialistsPage() {
  const {
    status,
    search,
    page,
    limit,
    setData,
    setLoading,
    setError,
    loading,
  } = useSpecialistsStore();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetchSpecialists({ status, search, page, limit });
        setData({
          specialists: res.data,
          totalCount: res.meta.totalCount,
          totalPages: res.meta.totalPages,
        });
      } catch (err: any) {
        console.error(err);
        setError("Failed to load specialists");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [status, search, page, limit, setData, setLoading, setError]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this specialist?")) return;
    try {
      await api.delete(`/specialists/${id}`);
      // reload current page
      const res = await fetchSpecialists({ status, search, page, limit });
      setData({
        specialists: res.data,
        totalCount: res.meta.totalCount,
        totalPages: res.meta.totalPages,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to delete specialist");
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-[#222222] mb-1">
          Specialists
        </h1>
        <p className="text-sm text-gray-500">
          Create and manage your services for clients & companies.
        </p>
      </div>

      <SpecialistsFilters />

      {loading ? (
        <div className="mt-8 text-center text-gray-500">Loading...</div>
      ) : (
        <SpecialistsTable onDelete={handleDelete} />
      )}
    </DashboardLayout>
  );
}
