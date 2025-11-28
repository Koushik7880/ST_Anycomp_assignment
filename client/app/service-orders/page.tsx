// client/app/service-orders/page.tsx
"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import SpecialistsListView from "@/components/specialists/SpecialistsListView";

export default function ServiceOrdersPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Breadcrumb (simple text version – optional) */}
        <div className="text-xs text-gray-500">
          Dashboard /{" "}
          <span className="font-medium text-gray-700">Service Orders</span>
        </div>

        <SpecialistsListView />
      </div>
    </DashboardLayout>
  );
}
