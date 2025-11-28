// src/app/specialists/page.tsx
"use client";

import { useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SpecialistsFilters from "@/components/specialists/SpecialistsFilters";
import SpecialistsTable from "@/components/specialists/SpecialistsTable";
import { useSpecialistsStore } from "@/store/specialistsStore";
import { fetchSpecialists } from "@/lib/specialists";
import { api } from "@/lib/api";
import { Button } from "@mui/material";

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

      // reload current page after delete
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

  // 📌 Export Handler — downloads Excel CSV file
  const handleExport = async () => {
    try {
      const res = await api.get("/specialists/export", {
        responseType: "blob", // important for downloading a file
      });

      const blob = new Blob([res.data], {
        type: "text/csv;charset=utf-8;",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "specialists-export.csv");

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed", err);
      alert("Failed to export specialists");
    }
  };

  return (
    <DashboardLayout>
      {/* ---------- HEADER + EXPORT BUTTON ---------- */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#222222] mb-1">
            Specialists
          </h1>
          <p className="text-sm text-gray-500">
            Create and manage your services for clients & companies.
          </p>
        </div>

        <div className="flex gap-2">
          {/* Export Button */}
          <Button
            variant="outlined"
            className="!normal-case !px-4"
            onClick={handleExport}
          >
            Export
          </Button>
        </div>
      </div>

      {/* ---------- FILTERS + TABLE ---------- */}
      <SpecialistsFilters />

      {loading ? (
        <div className="mt-8 text-center text-gray-500">Loading...</div>
      ) : (
        <SpecialistsTable onDelete={handleDelete} />
      )}
    </DashboardLayout>
  );
}
