// client/components/specialists/SpecialistsListView.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Specialist } from "@/types/specialists";
import { fetchPublishedSpecialists } from "@/lib/specialists";

type SortOption = "price-asc" | "price-desc";

export default function SpecialistsListView() {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("price-asc");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetchPublishedSpecialists(1, 20);
        setSpecialists(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load services.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const sortedSpecialists = [...specialists].sort((a, b) => {
    const priceA = Number((a as any).final_price ?? (a as any).base_price ?? 0);
    const priceB = Number((b as any).final_price ?? (b as any).base_price ?? 0);

    if (sortBy === "price-asc") return priceA - priceB;
    return priceB - priceA;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header + filters row */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#222222]">
            Register a New Company
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Get your company registered with a trusted secretary.
          </p>
        </div>

        <div className="flex gap-3">
          {/* Price filter (placeholder – can be wired later if needed) */}
          <select
            className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue="Price"
          >
            <option>Price</option>
            <option>Below RM 1,000</option>
            <option>RM 1,000 – RM 2,000</option>
            <option>Above RM 2,000</option>
          </select>

          {/* Sort by */}
          <select
            className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
          >
            <option value="price-asc">Sort by price (low → high)</option>
            <option value="price-desc">Sort by price (high → low)</option>
          </select>
        </div>
      </div>

      {/* Loading / error states */}
      {loading && (
        <div className="py-12 text-center text-sm text-gray-500">
          Loading services…
        </div>
      )}

      {error && !loading && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedSpecialists.map((specialist) => {
            const price = Number(
              (specialist as any).final_price ??
                (specialist as any).base_price ??
                0
            );

            const image =
              (specialist as any).media?.[0]?.url ??
              "/placeholder-service-image.jpg";

            return (
              <Link
                key={specialist.id}
                href={`/service-orders/${specialist.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {/* Top image */}
                <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={image}
                    alt={specialist.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div className="text-xs text-gray-500">
                    {/* you can replace with real “author / secretary name” later */}
                    Company Secretary Service
                  </div>

                  <h2 className="line-clamp-2 text-sm font-semibold text-[#222222]">
                    {specialist.title}
                  </h2>

                  <p className="line-clamp-3 text-xs text-gray-500">
                    {specialist.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="text-sm font-semibold text-[#222222]">
                      RM {price.toLocaleString("en-MY", { minimumFractionDigits: 0 })}
                    </div>

                    <button
                      type="button"
                      className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white transition-colors group-hover:bg-blue-700"
                    >
                      View Service
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}

          {sortedSpecialists.length === 0 && !loading && !error && (
            <div className="col-span-full py-12 text-center text-sm text-gray-500">
              No services available yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
