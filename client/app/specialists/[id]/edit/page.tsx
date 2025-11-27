// client/app/specialists/[id]/edit/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SpecialistForm from "@/components/specialists/SpecialistForm";
import { api } from "@/lib/api";
import { Specialist } from "@/types/specialists";

export default function EditSpecialistPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [specialist, setSpecialist] = useState<Specialist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/specialists/${id}`);
        setSpecialist(res.data.data as Specialist);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load specialist");
      } finally {
        setLoading(false);
      }
    };

    if (id) load();
  }, [id]);

  return (
    <DashboardLayout>
      {loading && (
        <div className="text-sm text-gray-500">Loading specialist...</div>
      )}
      {error && (
        <div className="text-sm text-red-600 border border-red-200 rounded px-3 py-2 bg-red-50">
          {error}
        </div>
      )}
      {!loading && !error && specialist && (
        <SpecialistForm mode="edit" initialData={specialist} />
      )}
    </DashboardLayout>
  );
}
