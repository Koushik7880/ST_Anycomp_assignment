// client/app/specialists/create/page.tsx
"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import SpecialistForm from "@/components/specialists/SpecialistForm";

export default function CreateSpecialistPage() {
  return (
    <DashboardLayout>
      <SpecialistForm mode="create" />
    </DashboardLayout>
  );
}
